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

//https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob?retiredLocale=de
//Code angelehnt an Code Beispiel der automatisch von Teachable Machine generiert wird
// Code Photo nach Firebase hochladen: or github: https://github.com/machadop1407/firebase-file-upload
//const URL = 'tm-my-image-model-5/';

const TestMoebelerkennung = (props) => {
    const [hasPhoto, setHasPhoto] = useState(false);
    const [isPredicting, setPredicting] = useState(false);
    const [predictions, setPredictions] = useState(null);
    const [step, setStep] = useState('info'); // 'scan', 'done'
    const [storedImageId, setStoredImageId] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const [amount, setAmount] = useState();
    const [length, setLength] = useState();
    const [weight, setWeight] = useState();
    const [room, setRoom] = useState();
    const [id, setId] = useState();
    const [label, setLabel] = useState();
    const [besonderheiten, setBesonderheiten] = useState();

    const unique_id = v4();
    const furnitureCollectionRef = collection(firestore, "furniture-data");

    //der Pfad für die Sammlung in Firebase, falls noch nciht vorhanden wird es angelegt
    const moebelCollectionRef = collection(firestore, "moebel-data");


    const tm = useContext(TeachableMachineContext);
    //FOTOUPLOAD
    // const unique_id = v4();
    // const storage = getStorage();
    //Umwandeln in ein PNG da es vorher ein octet-stream war und das bild sonst nicht angezeigt werden kann!!
    // const metadata = {
    //     contentType: 'image/png',
    // };

    //const imagesListRef = ref(storage, "images/");

    // //Beim Klick auf Button soll das Bild in Firebase geuploadet werden
    // const uploadImage = () => {
    //     addDoc(furnitureCollectionRef, {
    //         furniture: furniture,
    //     })
    //     if (imageUpload == null) return;
    //     const imageRef = ref(storage, `images/${v4()}`); //namen für bild samndom angeben
    //     //Bilder hochladen in den storage: das gesetzte Bild mit dem definierten namen als png...
    //     uploadBytes(imageRef, imageUpload, metadata, photo).then((snapshot) => {
    //
    //         getDownloadURL(snapshot.ref).then((url) => {
    //             setImageUrls((prev) => [...prev, url]);
    //             console.log(metadata);
    //         });
    //     });
    // };

    // useEffect(() => {
    //     listAll(imagesListRef).then((response) => {
    //         response.items.forEach((item) => {
    //             getDownloadURL(item).then((url) => {
    //                 setImageUrl((prev) => [...prev, url]);
    //             });
    //         });
    //     });
    // }, []);


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
    function getHighestPrediction(predictionlabels) {
        //predictionlabels
        let highestPrediction = null; //auch nullwert muss erlaubt sein, kann ausversehen mitgegeben werden
        for (let prediction of predictionlabels) { //schleife die die wahrscheinlichkeit der labels prüft
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
    function getLabelIfIsHighestPropability(predictionlabels, predictionlabel) {//alle label und das einzelne als wert mitgegeben
        let highestLabel = getHighestPrediction(predictionlabels);//funktion aufrufen mit allen labeln
        if (predictionlabel === highestLabel) {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return predictionlabel.className + ": " + (predictionlabel.probability * 100).toFixed(2) + "%";
        } else if (predictionlabel === "") {
            return "";
        }
        else { //wenn nicht bleib leer
            return '';
        }

    }



    // Switch name von ClassNames
    function showTextonLabels(highestPrediction) {
        switch (highestPrediction) {
            case "Drehhocker":
                return setLabel("Drehhocker");
            case "Drehstuhl":
                return setLabel("Drehstuhl");
            case "Sofa":
                return setLabel("Sofa");
            case "Stuhl":
                return setLabel("Stuhl");
            case "Tisch":
                return setLabel("Tisch");
            default:
                return "";
        }
    }



    //WENN BUTTON GEKLICKT, DANN FOTO MACHEN

    const takePhoto = async () => {

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
        tm.webcam.canvas.remove(); //camera Canvas wird removt wenn Foto aufgenommen
        setPredicting(false); //aufhören klassen anzuzeigen
        setHasPhoto(true); //foto wurde gemacht
        setStep('done');
    }



    //WENN BUTTON GEKLICKT, DANN KAMERA STARTEN


    //beim Button klicken soll die Kamera angehen, die Vorhersagen werden abgebildet und das Kamera Bild wird angezeigt
    const handleClick = async () => {
        await tm.start(); //starten
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
           /* label: label,*/
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
                                <p>{getLabelIfIsHighestPropability(predictions, prediction)}</p>
                                {/*   <p>{getLabelIfIsHighestPropability(predictions, prediction)}</p>*/}
                            </div>)
                        : ''}
                </div>
                <button id="weiter-button"onClick={handleComplete}>Weiter</button>
            </>}

            {step === 'data' &&
                <>
                    {imageUrl && <img className="imageurl" src={imageUrl}/>}
                    {label && <p> {label}</p>}
                    <form className="moebel-data">
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


                    </form>
                    <BigRectangle className="moebel-data-full-width">
                        <fieldset>
                            <h5 className="h5-moebel-data"> Raumauswahl</h5>
                            <div className="moebel-specials-item">
                                <input type="radio" id="kitchen"value="Küche" name="Raum"
                                       onChange={(event)=>{
                                           setRoom(event.target.value);
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
                </>}
            <TapBarList/>
        </div>
    );
}


export default TestMoebelerkennung;
