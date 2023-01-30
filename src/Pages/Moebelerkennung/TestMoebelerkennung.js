import './Moebelerkennung.css'
import React, {useContext, useEffect, useRef, useState} from 'react';
import {TeachableMachineContext} from "./TeachableMachineContext";
import {useAnimationFrame} from "./useAnimationFrame";
import Header from "../../components/Header/Header";
import TapBarList from "../../components/TapBar/TapBarList";
import {Link} from "react-router-dom";
import {
    ref,
    getStorage,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import {v4} from "uuid";
import {addDoc, collection} from "@firebase/firestore";
import {firestore} from "../../firebase";
import Moebelerkennung from "../../components/Pictures/Moebelerkennung/Couchbild.png";
import SmallRectangle from "../../components/UI/SmallRectangle";
import BigRectangle from "../../components/UI/BigRectangle";
import RoundButton from "../../components/UI/RoundButton";
import Kitchen from "../../components/Pictures/Moebel-Angaben/Raum/kitchen.png";
import Bedroom from "../../components/Pictures/Moebel-Angaben/Raum/bedroom.png";
import Livingroom from "../../components/Pictures/Moebel-Angaben/Raum/livingroom.png";
import Verpackung from "../../components/Pictures/MoebelAngaben/verpckung.png";
import Zerbrechlich from "../../components/Pictures/MoebelAngaben/zerbrechlich.png";
import Kratzer from "../../components/Pictures/MoebelAngaben/kratzer.png";

//https://www.youtube.com/watch?v=0iteBJ-fuRA
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob?retiredLocale=de
//Code angelehnt an Code Beispiel der automatisch von Teachable Machine generiert wird
// Code Photo nach Firebase hochladen: or github: https://github.com/machadop1407/firebase-file-upload
//https://github.com/googlecreativelab/teachablemachine-community/issues/73

//const URL = 'tm-my-image-model-5/';

const TestMoebelerkennung = (props) => {
    const [hasPhoto, setHasPhoto] = useState(false);
    const [isPredicting, setPredicting] = useState(false);
    const [predictions, setPredictions] = useState(null);
    const [step, setStep] = useState('info'); // 'scan', 'done'
    const [storedImageId, setStoredImageId] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const [amount, setAmount] = useState(1);// Allgemeine Anzahl der Möbelstücke, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [length, setLength] = useState(1);// Allgemeine Länge der Längsten Seite des Möbelstückes, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [weight, setWeight] = useState();// Allgemeines Gewicht, was in Firebase gespeichert wird, gesetzt je nach Klasse
    const [weightSofa, setWeightSofa] = useState(100);// count für Sofa Gewicht
    const [weightTisch, setWeightTisch] = useState(100);// count für Tisch Gewicht
    const [weightStuhl, setWeightStuhl] = useState(100);// count für Stuhl Gewicht
    const [weightDrehstuhl, setWeightDrehstuhl] = useState(100);// count für Tisch Gewicht
    const [weightSitzhocker, setWeightSitzhocker] = useState(100);// count für Tisch Gewicht
    const [room, setRoom] = useState();
    const [id, setId] = useState();
    const [label, setLabel] = useState();
    const [besonderheiten, setBesonderheiten] = useState();



    const unique_id = v4(); //erstellen einer unique ID für das Möbelstück!

    //der Pfad für die Sammlung in Firebase, falls noch nciht vorhanden wird es angelegt
    const moebelCollectionRef = collection(firestore, "moebel-data");


    const tm = useContext(TeachableMachineContext);


    //KAMERA CONTAINER
    const divEl = useRef(null);

    //Animation Frame läuft immer
    useAnimationFrame(deltaTime => {
        if (tm.started) {
            tm.webcam.update(); //webcam wird immer geupdatet, damit neustes build entsteht
            tm.model.predict(tm.webcam.canvas).then(setPredictions) //vorhersagen der erkannten Klassen werden gesetzt

        }
    })




    //Funktion für alle labels
    function getHighestPrediction(predictions) {
        let highestPrediction = null; //auch nullwert muss erlaubt sein, kann ausversehen mitgegeben werden
        for (let prediction of predictions) { //schleife die die wahrscheinlichkeit der labels prüft
            if (highestPrediction === null) { //wenn höchste wahrschenlichkeit kein wert hat
                if (prediction.probability > 0.3 && hasPhoto === true) { //prüfen ob wahrscheinlichkeit größer als 30% ist dann ist die höchste wahrscheinlichkeit die aktuelle wahrscheinlichkeit
                    highestPrediction = prediction;
                }
            } else if (highestPrediction != null && prediction.probability > highestPrediction.probability) { //wenn höchte wahrscheinlichkeit ungleich null und die wahrscheinlichkeit größer als die höchste wahrschinlichkeit, dann höchste wahrscheinlichkeit als wahrscheinlichkeit
                highestPrediction = prediction;
            }
        }
        return highestPrediction; //wiedergeben der höchsten wahrscheinlichkeit
    }

    //fuktion die das Label wiedegibt wenn höchste wahrscheinlichkeit gesetzt
    function getLabelIfIsHighestPropability(predictions, prediction) {//alle label und das einzelne als wert mitgegeben
        let highestLabel = getHighestPrediction(predictions);//funktion aufrufen mit allen labeln
        if (prediction === highestLabel) {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return prediction.className + ": " + (prediction.probability * 100).toFixed(2) + "%";
        } else { //wenn nicht bleib leer
            return '';
        }

    }




    // FUNKTIONEN UM DIE BESTIMMTEN DATEN FÜR DIE JEWEILIGE KLASSE HERAUS ZU BEKOMMEN
    // es werden immer zwei angaben getätigt:
    // 1. man muss einmal die Daten nur für die spezielle Klasse angeben, da dies nur gezeigt wird, wenn die Klasse gezeigt wird (Wahl zwischen Sofa,Stuhl,Tisch,Drehstuhl,Sitzhocker -> jede Kalsse hat unterschiedliche Anfangswerte bei Länge,Gewicht,Anzahl)
    // 2. dann nochmal den allgemeinen Wert setzen, welcher je nachdem welches Möbelstück erkannt wird dann den Wert bekommt, der bei 1. definiert wurde (Länge, Gewicht oder Anzahl wird anhand der erkannten Klasse gesetzt & in Firebase gespeichert)
    //WEIGHT
    const handleAmountWeightAdd = () => {

        setWeight(weight + 5);
    }

    //########## WEIGHT ############################################

    //GEWICHT NUR ANZEIGEN WENN SOFA + GEWICHT HINZUFÜGEN
    const handleAmountWeightAddSofa = () => {
        setWeightSofa(weightSofa + 10); //für das Gewicht vom Sofa, bei jedem Klick geupdatet
        setWeight(weightSofa + 10); //um das Gewicht allgemein auf das Gewicht des Sofas zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }
    //GEWICHT NUR ANZEIGEN WENN TISCH + GEWICHT HINZUFÜGEN
    const handleAmountWeightAddTisch = () => {
        setWeightTisch(weightTisch + 10); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setWeight(weightTisch + 10); //um das Gewicht allgemein auf das Gewicht des Tisches zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }
    //GEWICHT NUR ANZEIGEN WENN STUHL + GEWICHT HINZUFÜGEN
    const handleAmountWeightAddStuhl = () => {
        setWeightStuhl(weightStuhl + 10); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setWeight(weightStuhl + 10); //um das Gewicht allgemein auf das Gewicht des Tisches zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }
    //GEWICHT NUR ANZEIGEN WENN DREHSTUHL + GEWICHT HINZUFÜGEN
    const handleAmountWeightAddDrehstuhl = () => {
        setWeightDrehstuhl(weightDrehstuhl + 10); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setWeight(weightDrehstuhl + 10); //um das Gewicht allgemein auf das Gewicht des Tisches zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //GEWICHT NUR ANZEIGEN WENN SITZHOCKER + GEWICHT HINZUFÜGEN
    const handleAmountWeightAddSitzhocker = () => {
        setWeightSitzhocker(weightSitzhocker + 10); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setWeight(weightSitzhocker + 10); //um das Gewicht allgemein auf das Gewicht des Tisches zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }
    //WEIGHT
    const handleAmountWeightDecrease = () => {
        setWeight(weight - 5);
    }

    //GEWICHT NUR ANZEIGEN WENN SOFA + GEWICHT REDUZIEREN
    const handleAmountWeightDecreaseSofa = () => {
        setWeightSofa(weightSofa - 10); //für das Gewicht vom Sofa, bei jedem Klick geupdatet
        setWeight(weightSofa - 10); //um das Gewicht allgemein auf das Gewicht des Sofas zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }
    //GEWICHT NUR ANZEIGEN WENN TISCH + GEWICHT REDUZIEREN
    const handleAmountWeightDecreaseTisch = () => {
        setWeightTisch(weightTisch - 10); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setWeight(weightTisch - 10); //um das Gewicht allgemein auf das Gewicht des Tisches zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //GEWICHT NUR ANZEIGEN WENN STUHL + GEWICHT REDUZIEREN
    const handleAmountWeightDecreaseStuhl = () => {
        setWeightStuhl(weightStuhl - 10); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setWeight(weightStuhl - 10); //um das Gewicht allgemein auf das Gewicht des Tisches zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }
    //GEWICHT NUR ANZEIGEN WENN DREHSTUHL + GEWICHT REDUZIEREN
    const handleAmountWeightDecreaseDrehstuhl = () => {
        setWeightDrehstuhl(weightDrehstuhl - 10); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setWeight(weightDrehstuhl - 10); //um das Gewicht allgemein auf das Gewicht des Tisches zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //GEWICHT NUR ANZEIGEN WENN DREHSTUHL + GEWICHT REDUZIEREN
    const handleAmountWeightDecreaseSitzhocker = () => {
        setWeightSitzhocker(weightSitzhocker - 10); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setWeight(weightSitzhocker - 10); //um das Gewicht allgemein auf das Gewicht des Tisches zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }


    //ANZAHL MÖBELSTÜCKE
    const handleAmountIdenticalFurnitureAdd = () => {
        setAmount(amount + 1);
    }
    //ANZAHL MÖBELSTÜCKE
    const handleIdenticalFurnitureDecrease = () => {
        setAmount(amount - 1);
    }
    //LÄNGE
    const handleLengthFurnitureAdd = () => {
        setLength(length + 10);
    }
    //LÄNGE
    const handleLengthFurnitureDecrease = () => {
        setLength(length - 10);
    }

    //GEWICHT HINZUFÜGEN
    function buttonClickedAdd() {
        handleAmountWeightAdd(); //macht +5 Gewicht
    }
    function buttonClickedAddSofa() {
        handleAmountWeightAddSofa(); //macht +5 Gewicht Sofa
    }
    //GEWICHT REDUZIEREN
    function buttonClickedDecrease() {
        handleAmountWeightDecrease(); //macht -5 Gewicht
    }
    function buttonClickedDecreaseSofa() {
        handleAmountWeightDecreaseSofa(); //macht -5 Gewicht sofa
    }
    //ANZAHL HINZUFÜGEN
    function buttonClickedAddIdenticalFurniture() {
        handleAmountIdenticalFurnitureAdd(); //macht +1 Anzahl der Möbelstücke
    }
    //ANZAHL REDUZIEREN
    function buttonClickedDecreaseIdenticalFurniture() {
        handleIdenticalFurnitureDecrease(); //macht -1 Anzahl der Möbelstücke
    }
    //LÄNGE HINZUFÜGEN
    function buttonClickedAddLengthFurniture() {
        handleLengthFurnitureAdd(); //macht +20cm Länge
    }
    //LÄNGE REDUZIEREN
    function buttonClickedDecreaseLengthFurniture() {
        handleLengthFurnitureDecrease(); //macht -20cm Länge
    }



    //FUNKTION UM DAS FELD FÜR ANZAHL ANZUZEIGEN BEI DEN MÖBELANGABEN
    function getInputAmount(predictions, prediction) {//alle label und das einzelne als wert mitgegeben
        let highestLabel = getHighestPrediction(predictions);//funktion aufrufen mit allen labeln
        if (prediction === highestLabel && prediction.className==="Sofa") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="container-row">
                    <div onClick={buttonClickedDecreaseIdenticalFurniture}>-</div>
                    <div className="count"> {amount}</div>
                    <div onClick={buttonClickedAddIdenticalFurniture}>+</div>
                </div>
            </SmallRectangle >;
        }
        else if(prediction === highestLabel && prediction.className==="Sitzhocker") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="container-row">
                    <div onClick={buttonClickedDecreaseIdenticalFurniture}>-</div>
                    <div className="count"> {amount}</div>
                    <div onClick={buttonClickedAddIdenticalFurniture}>+</div>
                </div>
            </SmallRectangle >;
        }else if(prediction === highestLabel && prediction.className==="Drehstuhl") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="container-row">
                    <div onClick={buttonClickedDecreaseIdenticalFurniture}>-</div>
                    <div className="count"> {amount}</div>
                    <div onClick={buttonClickedAddIdenticalFurniture}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Tisch") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="container-row">
                    <div onClick={buttonClickedDecreaseIdenticalFurniture}>-</div>
                    <div className="count"> {amount}</div>
                    <div onClick={buttonClickedAddIdenticalFurniture}>+</div>
                </div>
            </SmallRectangle >;
        }else if(prediction === highestLabel && prediction.className==="Stuhl") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="container-row">
                    <div onClick={buttonClickedDecreaseIdenticalFurniture}>-</div>
                    <div className="count"> {amount}</div>
                    <div onClick={buttonClickedAddIdenticalFurniture}>+</div>
                </div>
            </SmallRectangle >;
        }

    }


    //FUNKTION UM DAS FELD FÜR GEWICHT ANZUZEIGEN BEI DEN MÖBELANGABEN
    function getInputWeight(predictions, prediction) {//alle label und das einzelne als wert mitgegeben
        let highestLabel = getHighestPrediction(predictions);//funktion aufrufen mit allen labeln
        if (prediction === highestLabel && prediction.className==="Sofa") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="container-row">
                    <div onClick={buttonClickedDecreaseSofa}>-</div>
                    <div className="count"> {weightSofa}</div>
                    <div onClick={buttonClickedAddSofa}>+</div>
                </div>
            </SmallRectangle >;
        }
        else if(prediction === highestLabel && prediction.className==="Sitzhocker") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="container-row">
                    <div onClick={handleAmountWeightDecreaseSitzhocker}>-</div>
                    <div className="count"> {weightSitzhocker}</div>
                    <div onClick={handleAmountWeightAddSitzhocker}>+</div>
                </div>
            </SmallRectangle >;
        }else if(prediction === highestLabel && prediction.className==="Drehstuhl") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="container-row">
                    <div onClick={handleAmountWeightDecreaseDrehstuhl}>-</div>
                    <div className="count"> {weightDrehstuhl}</div>
                    <div onClick={handleAmountWeightAddDrehstuhl}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Tisch") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="container-row">
                    <div onClick={handleAmountWeightDecreaseTisch}>-</div>
                    <div className="count"> {weightTisch}</div>
                    <div onClick={handleAmountWeightAddTisch}>+</div>
                </div>
            </SmallRectangle >;
        }else if(prediction === highestLabel && prediction.className==="Stuhl") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="container-row">
                    <div onClick={handleAmountWeightDecreaseStuhl}>-</div>
                    <div className="count"> {weightStuhl}</div>
                    <div onClick={handleAmountWeightAddStuhl}>+</div>
                </div>
            </SmallRectangle >;
        }

    }

//FUNKTION UM DAS FELD FÜR GEWICHT ANZUZEIGEN BEI DEN MÖBELANGABEN
    function getInputLength(predictions, prediction) {//alle label und das einzelne als wert mitgegeben
        let highestLabel = getHighestPrediction(predictions);//funktion aufrufen mit allen labeln
        if (prediction === highestLabel && prediction.className==="Sofa") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Länge</label>
                <div className="container-row">
                    <div onClick={buttonClickedDecreaseLengthFurniture}>-</div>
                    <div className="count"> {length}</div>
                    <div onClick={buttonClickedAddLengthFurniture}>+</div>
                </div>
            </SmallRectangle >;
        }
        else if(prediction === highestLabel && prediction.className==="Sitzhocker") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Länge</label>
                <div className="container-row">
                    <div onClick={buttonClickedDecreaseLengthFurniture}>-</div>
                    <div className="count"> {length}</div>
                    <div onClick={buttonClickedAddLengthFurniture}>+</div>
                </div>
            </SmallRectangle >;
        }else if(prediction === highestLabel && prediction.className==="Drehstuhl") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Länge</label>
                <div className="container-row">
                    <div onClick={buttonClickedDecreaseLengthFurniture}>-</div>
                    <div className="count"> {length}</div>
                    <div onClick={buttonClickedAddLengthFurniture}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Tisch") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Länge</label>
                <div className="container-row">
                    <div onClick={buttonClickedDecreaseLengthFurniture}>-</div>
                    <div className="count"> {length}</div>
                    <div onClick={buttonClickedAddLengthFurniture}>+</div>
                </div>
            </SmallRectangle >;
        }else if(prediction === highestLabel && prediction.className==="Stuhl") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <SmallRectangle>
                <label>Länge</label>
                <div className="container-row">
                    <div onClick={buttonClickedDecreaseLengthFurniture}>-</div>
                    <div className="count"> {length}</div>
                    <div onClick={buttonClickedAddLengthFurniture}>+</div>
                </div>
            </SmallRectangle >;
        }

    }













    //WENN BUTTON GEKLICKT, DANN FOTO MACHEN

    const takePhoto = async () => {
        setLabel(predictions); //Ergebnis null
        const imageId = v4();
        tm.webcam.canvas.toBlob(imageBlob => {

            const storage = getStorage();

            //Umwandeln in ein PNG da es vorher ein octet-stream war und das bild sonst nicht angezeigt werden kann!!
            const metadata = {
                contentType: 'image/png',
            };

            const imageRef = ref(storage, `images/${imageId}`); //namen für bild samndom angeben

            uploadBytes(imageRef, imageBlob, metadata).then((snapshot) => {

                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrl(url);
                    setStoredImageId(url);
                    console.log(metadata);
                });
            });
        })

        await tm.stop();//kamera geht aus wenn foto gemacht wird
        //tm.webcam.webcam.remove(); //camera Canvas wird removt wenn Foto aufgenommen
        tm.webcam.canvas.remove(); //camera Canvas wird removt wenn Foto aufgenommen
        setPredicting(false); //aufhören klassen anzuzeigen
        setHasPhoto(true); //foto wurde gemacht
        setStep('done');
    }



    //WENN BUTTON GEKLICKT, DANN KAMERA STARTEN


    //beim Button klicken soll die Kamera angehen, die Vorhersagen werden abgebildet und das Kamera Bild wird angezeigt
    const handleClick = async () => {
        await tm.start(); //starten
       /* divEl.current.appendChild(tm.webcam.webcam); //in dem div das webcam canvas erscheinen lassen*!/
        let wc = document.getElementsByTagName('video')[0];
        wc.setAttribute("playsinline", true); // written with "setAttribute" bc. iOS buggs otherwise :-)
        wc.muted = "true"
        wc.id = "webcamVideo";*/
        divEl.current.appendChild(tm.webcam.canvas); //in dem div das webcam canvas erscheinen lassen*/
        setPredicting(true); //die klassen sollen jetzt angehen
        setStep('scan');

    }



    //beim Klick auf den Button werden sie Sachen an Firebase geschickt
    const handleComplete = ()=>{
        setStep('data');
    }
    const handleDone = ()=>{
        setStep('info');
        // neues möbelstück anlegen und storedImageId verwenden
        addDoc(moebelCollectionRef,{
            id:id,
            amount: amount,
            length: length,
            weight: weight,
            room: room,
            besonderheiten: besonderheiten,
            storedImageId: storedImageId,
            label: label,
        })
    }






    return (
        <div className="secondary-background">
            <Header/>
            <div ref={divEl} id="webcam-container"></div>
            {step === 'info' &&
                <>
                    {/*Das Bild ist von: https://de.freepik.com/fotos-kostenlos/skandinavischer-wohnzimmer-innenarchitektur-zoom-hintergrund_18835794.htm#page=2&query=couch&position=0&from_view=search&track=sph*/}
                    <img id="Möbelerkennung" src={Moebelerkennung} alt="Möbelerkennung Standardbild" height={150}
                         width={200}/>
                    <p id="erklärung-scan">Um ein Möbelstück in die Möbelliste hinzuzufügen, starte bitte den
                        Scan-Vorgang.
                        Achte bitte darauf, dass das Möbelstück gut sichtbar ist. Es sollte vollständig zu sehen sein.
                        Bitte
                        mach die Fotos möglichst bei Tageslicht.</p>
                    <button onClick={handleClick} id="scan-starten">Scan starten</button>
                </>
            }
            {step === 'scan' &&
                <>
                    <button onClick={takePhoto} id="foto-machen">Foto machen</button>
                </>
            }
            {step === 'done' &&
            <>
                {imageUrl && <img className="imageurl" src={imageUrl}/>}
                <div id="label-container">
                    {predictions
                        ? predictions.map((prediction) =>
                            <div id={prediction.className} key={prediction.className} className="Label-Klassen">
                                <h4>{getLabelIfIsHighestPropability(predictions, prediction)}</h4>
                            </div>)
                        : ''}
                </div>
                <button id="weiter-button"onClick={handleComplete}>Weiter</button>
            </>}

            {step === 'data' &&
                <>
                    {imageUrl && <img className="imageurl" src={imageUrl}/>}

                    <div id="label-container">
                        {predictions
                            ? predictions.map((prediction) =>
                                <div id={prediction.className} key={prediction.className} className="Label-Klassen">
                                    <h4>{getLabelIfIsHighestPropability(predictions, prediction)}</h4>

                                    <form className="moebel-data">
                                        <div>{getInputAmount(predictions, prediction)}</div>
                                        <div>{getInputWeight(predictions, prediction)}</div>
                                        <div>{getInputLength(predictions, prediction)}</div>
                                    </form>

                                </div>)
                            : ''}
                    </div>
                    <div className="data-container">
                        {/*<form className="moebel-data">
                            <SmallRectangle>
                                <label> Anzahl</label>
                                <input type="text" placeholder="Anzahl..."
                                       onChange={(event)=>{
                                           setAmount(event.target.value);
                                           setId(unique_id);
                                       }}/>
                            </SmallRectangle>
                            <SmallRectangle>
                                <label>Länge</label>
                                <input type="text" placeholder="Länge.."
                                       onChange={(event)=>{
                                           setLength(event.target.value);
                                       }}/>
                            </SmallRectangle >

                            <SmallRectangle>
                                <label> Gewicht</label>
                                <input type="text" placeholder="Gewicht.."
                                       onChange={(event)=>{
                                           setWeight(event.target.value);
                                       }}/>
                            </SmallRectangle >


                        </form>*/}
                        <BigRectangle className="moebel-data-full-width">
                            <fieldset>
                                <h5 className="h5-moebel-data"> Raumauswahl</h5>
                                <div className="moebel-specials-item">
                                    <input type="radio" id="kitchen"value="Küche" name="Raum"
                                           onChange={(event)=>{
                                               setRoom(event.target.value);
                                               setId(unique_id);
                                           }}/>
                                    <label  className="label-special-data" htmlFor="kitchen">
                                        <RoundButton className="picture-div">
                                            <img id="küche" src={Kitchen} alt="Kitchen" height={18} width={18} />
                                        </RoundButton>
                                        <p className="label-input">Küche</p>
                                    </label>




                                    <input type="radio" id="bedroom"value="Schlafzimmer" name="Raum"
                                           onChange={(event)=>{
                                               setRoom(event.target.value);
                                               setId(unique_id);
                                           }}/>
                                    <label className="label-special-data" htmlFor="bedroom">
                                        <RoundButton className="picture-div">
                                            <img id="schlafzimmer" src={Bedroom} alt="Schlafzimmer" height={18} width={18} />
                                        </RoundButton>
                                        <p className="label-input">Schlafzimmer</p>
                                    </label>

                                    <input type="radio" id="livingroom"value="Wohnzimmer" name="Raum"
                                           onChange={(event)=>{
                                               setRoom(event.target.value);
                                               setId(unique_id);
                                           }}/>
                                    <label className="label-special-data" htmlFor="livingroom">
                                        <RoundButton className="picture-div">
                                            <img id="wohnzimmer" src={Livingroom} alt="Wohnzimmer" height={18} width={18} />
                                        </RoundButton>
                                        <p className="label-input">Wohnzimmer</p>
                                    </label>

                                </div>
                            </fieldset>

                        </BigRectangle>


                        <BigRectangle className="moebel-data-full-width">
                            <fieldset>
                                <h5 className="h5-moebel-data"> Besonderheiten</h5>
                                <div className="moebel-specials-item">
                                    <input type="radio" id="verpackung"value="Verpackung" name="Besonderheiten"
                                           onChange={(event)=>{
                                               setBesonderheiten(event.target.value);
                                           }}/>
                                    <label className="label-special-data" htmlFor="verpackung">
                                        <RoundButton className="picture-div">
                                            <img id="verpackung-img" src={Verpackung} alt="Kitchen" height={18} width={18} />
                                        </RoundButton>
                                        <p className="label-input">Verpackung</p>
                                    </label>

                                    <input type="radio" id="zerbrechlich"value="Zerbrechlich" name="Besonderheiten"
                                           onChange={(event)=>{
                                               setBesonderheiten(event.target.value);
                                           }}/>
                                    <label className="label-special-data" htmlFor="zerbrechlich">
                                        <RoundButton className="picture-div">
                                            <img id="zerbrechlich-img" src={Zerbrechlich} alt="Kitchen" height={18} width={18} />
                                        </RoundButton>
                                        <p className="label-input">Zerbrechlich</p>
                                    </label>

                                    <input type="radio" id="kratzer"value="Kratzer" name="Besonderheiten"
                                           onChange={(event)=>{
                                               setBesonderheiten(event.target.value);
                                           }}/>
                                    <label className="label-special-data" htmlFor="kratzer">
                                        <RoundButton className="picture-div">
                                            <img id="kratzspuren" src={Kratzer} alt="Kitchen" height={18} width={18} />
                                        </RoundButton>
                                        <p className="label-input">Kratzer</p>
                                    </label>

                                </div>
                            </fieldset>

                        </BigRectangle>
                        <button className="right" onClick={handleDone}> Hinzufügen</button>
                    </div>


                </>}
            <TapBarList/>
        </div>
    );
}


export default TestMoebelerkennung;
