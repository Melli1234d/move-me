import './Moebelerkennung.css'
import React, {useContext, useRef, useState} from 'react';
import {TeachableMachineContext} from "./TeachableMachineContext";
import {useAnimationFrame} from "./useAnimationFrame";
import Header from "../../components/Header/Header";
import TapBarList from "../../components/TapBar/TapBarList";
import {
    ref,
    getStorage,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import {v4} from "uuid";
import {addDoc, collection, updateDoc, doc} from "@firebase/firestore";
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
import { v4 as uuidv4 } from 'uuid';
import {setDoc} from "@firebase/firestore";

//#############################################################################################################################################################
//CODE: https://www.youtube.com/watch?v=0iteBJ-fuRA
//CODE:https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob?retiredLocale=de
//CODE: angelehnt an Code Beispiel der automatisch von Teachable Machine generiert wird
//CODE: Photo nach Firebase hochladen: or github: https://github.com/machadop1407/firebase-file-upload
//CODE: https://github.com/googlecreativelab/teachablemachine-community/issues/73
//#############################################################################################################################################################

const TestMoebelerkennung = (props) => {
    const [hasPhoto, setHasPhoto] = useState(false); //status ob Foto gemacht wurde oder nicht -> wird verwendet bei den Labels, sollen erst erscheinen wenn Foto gemacht
    const [predictions, setPredictions] = useState(null); //Vorhersagen sollen gemacht, werden wenn Kamera an
    const [step, setStep] = useState('info'); // Steps -> 'scan', 'done', 'data'
    const [storedImageId, setStoredImageId] = useState(); //Image ID mit URL des Bildes aus Firebase Storage
    const [imageUrl, setImageUrl] = useState(null); //URL von Firebase Storage Image erstellen
    const [amount, setAmount] = useState(2);// Allgemeine Anzahl der Möbelstücke, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [amountSofa, setAmountSofa] = useState(2);// count für Sofa Anzahl
    const [amountTisch, setAmountTisch] = useState(1); //count für Tisch Anzahl
    const [amountStuhl, setAmountStuhl] = useState(4);//count für Stuhl Anzahl
    const [amountDrehstuhl, setAmountDrehstuhl] = useState(1);//count für Drehstuhl Anzahl
    const [amountSitzhocker, setAmountSitzhocker] = useState(1);//count für Sofa Anzahl
    const [length, setLength] = useState(100);// Allgemeine Länge der Längsten Seite des Möbelstückes, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [lengthSofa, setLengthSofa] = useState(200);// count für Sofa Anzahl
    const [lengthTisch, setLengthTisch] = useState(160); //count für Tisch Anzahl
    const [lengthStuhl, setLengthStuhl] = useState(120);//count für Stuhl Anzahl
    const [lengthDrehstuhl, setLengthDrehstuhl] = useState(100);//count für Drehstuhl Anzahl
    const [lengthSitzhocker, setLengthSitzhocker] = useState(60);//count für Sofa Anzahl
    const [weight, setWeight] = useState(50);// Allgemeines Gewicht, was in Firebase gespeichert wird, gesetzt je nach Klasse
    const [weightSofa, setWeightSofa] = useState(100);// count für Sofa Gewicht
    const [weightTisch, setWeightTisch] = useState(50);// count für Tisch Gewicht
    const [weightStuhl, setWeightStuhl] = useState(20);// count für Stuhl Gewicht
    const [weightDrehstuhl, setWeightDrehstuhl] = useState(60);// count für Tisch Gewicht
    const [weightSitzhocker, setWeightSitzhocker] = useState(15);// count für Tisch Gewicht
    const [room, setRoom] = useState(); //Raum in Firebase gesetzt in der 'data' Ansicht
    const [id, setId] = useState(); //Id in Firebase gesetzt wenn Raum gesetzt wird
    const [label, setLabel] = useState(); //Label in Firebase , alle werden als Array in Firebase gespeichert inkl. classname + propability (Sofa,Tisch,Stuhl,Drehstuhl,Sithocker)
    const [besonderheiten, setBesonderheiten] = useState(); //Besonderheiten in Firebase gesetzt in der 'data' Ansicht

//#############################################################################################################################################################
//ANDERE VARIABELN
//#############################################################################################################################################################
    const unique_id = v4(); //erstellen einer unique ID für das Möbelstück!
    const moebelCollectionRef = collection(firestore, "moebel-data");//der Pfad für die Sammlung in Firebase, falls noch nciht vorhanden wird es angelegt
    const tm = useContext(TeachableMachineContext); //das Modell von dem Teachable Machine Context als "tm" verwenden -> definition der modelurl,metadataurl + webcam
    const divEl = useRef(null);//anfang leerer Continer, später soll Kamera hier rein -> definiert in handleClick


//#############################################################################################################################################################
    //ANIMATION FRAME DER DEN LOOP STÄNDIG DURCHLÄUFT UND IN ECHTZEIT UPDATET WENN KAMERA GESTARTET
//#############################################################################################################################################################
    useAnimationFrame(deltaTime => {
        if (tm.started) { //Funktion startet im context definiert
            tm.webcam.update(); //webcam wird immer geupdatet, damit neustes build entsteht
            tm.model.predict(tm.webcam.canvas).then(setPredictions) //vorhersagen der erkannten Klassen werden gesetzt
        }
    })


//#############################################################################################################################################################
//BUTTON KLICKEN UM KAMERA ZU STARTEN UND DAS CANVAS ALS KIND ELEMENT HINZUFÜGEN &
//VORHERSAGEN WERDEN IM HINTERGRUND GETROFFEN (DEFINIERT IN USEANIMATIONFRAME)
    // & STEP "SCAN"
// #############################################################################################################################################################
    const handleClick = async () => {
        await tm.start(); // Kamera starten
        divEl.current.appendChild(tm.webcam.canvas); //in dem div das webcam canvas erscheinen lassen
        setStep('scan');
    }

//#############################################################################################################################################################
// BUTTON KLICKEN FÜR FOTO MACHEN & FOTO IN FIREBADE HOCHLADEN & DOWNLOAD URL GENERIEREN & KAMERA STOPPEN & STEP "DONE"
//#############################################################################################################################################################
    const takePhoto = async () => {

        setLabel(predictions); // die Labels für Firebase speichern

        const imageId = v4(); //random ID generieren

        tm.webcam.canvas.toBlob(imageBlob => {  //aus dem Kamera Stream der läuft ein Foto machen, Blob Objekt als Argument eingesetzt (imageBloB)
            const storage = getStorage(); //Storage von Firebase für die Fotos
            const metadata = {
                contentType: 'image/png',   // Bild Umwandeln in ein PNG
            };
            const imageRef = ref(storage, `images/${imageId}`);//Namen für Bild mit random erstellter ID in den Order "images" im Storage von Firebase speichern

            uploadBytes(imageRef, imageBlob, metadata).then((snapshot) => { //Bild in Firebase speichern, mitgegeben wird der Pfad wo es gespeichert wird (ImageRef), imageBlob als Objekt was gespeichert wird und wie es gespeichert wird (metatada -> png)
                getDownloadURL(snapshot.ref).then((url) => { //snapshot machen, diese als referenz für die url benutzen, url ist im Stoage
                    setImageUrl(url); //image url auf die eben erstellte URL des Bildes setzen, die unten verwendet wird
                    setStoredImageId(url); //Stored Image ID soll die URL sein die eben erstellt wurde, diese wird in Firebase gespeicher
                });
            });
        })

        await tm.stop();//kamera geht aus wenn foto gemacht wird
        tm.webcam.canvas.remove(); //camera Canvas wird removt wenn Foto aufgenommen -> damit oben nicht ein leerer weißer container zu sehen ist
        setHasPhoto(true); //foto wurde gemacht
        setStep('done');
    }



//#############################################################################################################################################################
//GEMACHTE FOTO BESTÄTIGEN UND AUF "DATA" SCREEN WECHSELN
//#############################################################################################################################################################
    const handleComplete = ()=>{
        setStep('data');
    }



//#############################################################################################################################################################
//SETZE AUF SCHRITT "INFO" & FÜGE MÖBELSTÜCK IN LISTE HINZU (ID, ANZAHL, LÄNGE,GEWICHT,RAUM,BESONDERHEITEN,URL DES BILDES, LABELS[]
//#############################################################################################################################################################
    const handleDone = ()=>{
        setStep('info');
        const id = doc.payload.id;

        // neues möbelstück anlegen in der Firebase Database collection "moebel-data" (Pfad definiert in moebelCollectionRef)
        addDoc(moebelCollectionRef,{
            id: unique_id,
            amount: amount,
            length: length,
            weight: weight,
            room: room,
            besonderheiten: besonderheiten,
            storedImageId: storedImageId,
            label: label,
        })
    }


    async function addMoebel() {
        setStep('info');

        const newMoebel = {
            id: id,
            amount: amount,
            length: length,
            weight: weight,
            room: room,
            besonderheiten: besonderheiten,
            storedImageId: storedImageId,
            label: label,
        };

        try {
            const moebelRef = doc(moebelCollectionRef, id);
            await setDoc(moebelRef, newMoebel);
        } catch (error) {
            console.error(error);
        }
    }


//#############################################################################################################################################################
// FUNKTION DIE DIE HÖCHSTE WAHRSCHEINLICHKEIT RETURNT
//#############################################################################################################################################################
    function getHighestPrediction(predictions) { //mitgegeben werden alle Vorhersagen
        let highestPrediction = null; //auch nullwert muss erlaubt sein, kann ausversehen mitgegeben werden & ist anfangs null
        for (let prediction of predictions) { //schleife die die wahrscheinlichkeit der labels prüft, jede einzelne Wahrscheinlichkeit aller Klassen wird durchgegangen
            if (highestPrediction === null) { //wenn höchste wahrschenlichkeit kein wert hat weil noch nichts bestimmt
                if (prediction.probability > 0.3 && hasPhoto === true) { //prüfen ob wahrscheinlichkeit größer als 30% ist und das Foto gemacht wurde -> 30% weil Wahrscheinlichkeit erst ab einem bestimmten Wert angezeigt werden soll
                    highestPrediction = prediction; // dann ist die höchste wahrscheinlichkeit die aktuelle wahrscheinlichkeit des erkannten Möbelstückes
                }
            } else if (highestPrediction != null && prediction.probability > highestPrediction.probability) { //wenn höchte wahrscheinlichkeit bereits bestimmt (weil Echtzeit Schleife)
                highestPrediction = prediction; // und andere Wahrscheinlichkeit größer als die höchste Wahrschinlichkeitdann höchste Wahrscheinlichkeit als wahrscheinlichkeit
            }
        }
        return highestPrediction; //wiedergeben der höchsten wahrscheinlichkeit
    }

//#############################################################################################################################################################
//FUNKTION DIE DAS DAZUGEHÖRIGE LABEL DER HÖCHSTEN WAHRSCHEINLICHKEIT + WAHRSCHEINLICHKEIT ZU DER HÖCHSTEN PROZENTZAHL DER VORHERSAGE GIBT
//#############################################################################################################################################################
    function getLabelIfIsHighestPropability(predictions, prediction) {//alle label und das einzelne als wert mitgegeben, da nur eins raus gefiltert werden soll
        let highestLabel = getHighestPrediction(predictions);//höchste Label ist das mit der höchsten Wahrscheinlichkeit -> funktion aufrufen mit allen Wahrscheinlichkeiten
        if (prediction === highestLabel) { //wenn das Label das Label mit der höchsten Wahrscheinlichkeit
            return prediction.className + ": " + (prediction.probability * 100).toFixed(2) + "%"; // dann return label + wahrscheinlichkeit hochgerechnet auf eine zweistellige Dezimalzahl
        } else { //wenn nicht das Label mit höchster Wahrscheinlichkeit bleib leer -> Inhalt des DIV containers
            return '';
        }

    }


//##################################################################################################################################################################################
    // FUNKTIONEN UM DIE BESTIMMTEN DATEN FÜR DIE JEWEILIGE KLASSE HERAUS ZU BEKOMMEN
    // es werden immer zwei angaben getätigt:
    // 1. man muss einmal die Daten nur für die spezielle Klasse angeben, da dies nur gezeigt wird, wenn die Klasse gezeigt wird (Wahl zwischen Sofa,Stuhl,Tisch,Drehstuhl,Sitzhocker -> jede Kalsse hat unterschiedliche Anfangswerte bei Länge,Gewicht,Anzahl)
    // 2. dann nochmal den allgemeinen Wert setzen, welcher je nachdem welches Möbelstück erkannt wird dann den Wert bekommt, der bei 1. definiert wurde (Länge, Gewicht oder Anzahl wird anhand der erkannten Klasse gesetzt & in Firebase gespeichert)
//##################################################################################################################################################################################


//#############################################################################################################################################################
// WIEDERGABE BESTIMMTER INHALTE ZU LÄNGE, GEWICHT, ANZAHL CONTAINER BEI MÖBELANGABE
//#############################################################################################################################################################

    //FUNKTION UM DAS FELD FÜR ANZAHL ANZUZEIGEN BEI DEN MÖBELANGABEN
    function getInputAmount(predictions, prediction) {//alle label und das einzelne als wert mitgegeben
        let highestLabel = getHighestPrediction(predictions);//funktion aufrufen mit allen labeln
        if (prediction === highestLabel && prediction.className === "Sofa") {
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleIdenticalFurnitureDecreaseSofa} className="decrease">-</div>
                    <div className="count"> {amountSofa}</div>
                    <div onClick={handleAmountIdenticalFurnitureAddSofa} className="add">+</div>
                </div>
            </SmallRectangle>;
        } else if (prediction === highestLabel && prediction.className === "Sitzhocker") {
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleIdenticalFurnitureDecreaseSitzhocker} className="decrease">-</div>
                    <div className="count"> {amountSitzhocker}</div>
                    <div onClick={handleAmountIdenticalFurnitureAddSitzhocker} className="add">+</div>
                </div>
            </SmallRectangle>;
        } else if (prediction === highestLabel && prediction.className === "Drehstuhl") {
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleIdenticalFurnitureDecreaseDrehstuhl} className="decrease">-</div>
                    <div className="count"> {amountDrehstuhl}</div>
                    <div onClick={handleAmountIdenticalFurnitureAddDrehstuhl} className="add">+</div>
                </div>
            </SmallRectangle>;
        } else if (prediction === highestLabel && prediction.className === "Tisch") {
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleIdenticalFurnitureDecreaseTisch} className="decrease">-</div>
                    <div className="count"> {amountTisch}</div>
                    <div onClick={handleAmountIdenticalFurnitureAddTisch} className="add">+</div>
                </div>
            </SmallRectangle>;
        } else if (prediction === highestLabel && prediction.className === "Stuhl") {
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleIdenticalFurnitureDecreaseStuhl} className="decrease">-</div>
                    <div className="count"> {amountStuhl}</div>
                    <div onClick={handleAmountIdenticalFurnitureAddStuhl} className="add">+</div>
                </div>
            </SmallRectangle>;
        }

    }

    //FUNKTION UM DAS FELD FÜR GEWICHT ANZUZEIGEN BEI DEN MÖBELANGABEN
    function getInputWeight(predictions, prediction) {//alle label und das einzelne als wert mitgegeben
        let highestLabel = getHighestPrediction(predictions);//funktion aufrufen mit allen labeln
        //wenn Vorhersage gleich das Label mit der höchsten Wahrscheinlichkeit ist
        if (prediction === highestLabel && prediction.className==="Sofa") {
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleAmountWeightDecreaseSofa} className="decrease">-</div>
                    <div className="count"> {weightSofa}</div>
                    <div onClick={handleAmountWeightAddSofa} className="add">+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Sitzhocker") {
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleAmountWeightDecreaseSitzhocker} className="decrease">-</div>
                    <div className="count"> {weightSitzhocker}</div>
                    <div onClick={handleAmountWeightAddSitzhocker} className="add">+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Drehstuhl") {
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleAmountWeightDecreaseDrehstuhl} className="decrease">-</div>
                    <div className="count"> {weightDrehstuhl}</div>
                    <div onClick={handleAmountWeightAddDrehstuhl} className="add">+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Tisch") {
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleAmountWeightDecreaseTisch} className="decrease">-</div>
                    <div className="count"> {weightTisch}</div>
                    <div onClick={handleAmountWeightAddTisch} className="add">+</div>
                </div>
            </SmallRectangle >;
        }else if(prediction === highestLabel && prediction.className==="Stuhl") {
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleAmountWeightDecreaseStuhl} className="decrease">-</div>
                    <div className="count"> {weightStuhl}</div>
                    <div onClick={handleAmountWeightAddStuhl} className="add">+</div>
                </div>
            </SmallRectangle >;
        }

    }

    //FUNKTION UM DAS FELD FÜR LÄNGE ANZUZEIGEN BEI DEN MÖBELANGABEN
    function getInputLength(predictions, prediction) {//alle label und das einzelne als wert mitgegeben
        let highestLabel = getHighestPrediction(predictions);//funktion aufrufen mit allen labeln
        if (prediction === highestLabel && prediction.className==="Sofa") {
            return <SmallRectangle>
                <label>Länge</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleLengthFurnitureDecreaseSofa} className="decrease">-</div>
                    <div className="count"> {lengthSofa}</div>
                    <div onClick={handleLengthFurnitureAddSofa} className="add" >+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Sitzhocker") {
            return <SmallRectangle>
                <label>Länge</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleLengthFurnitureDecreaseSitzhocker} className="decrease">-</div>
                    <div className="count"> {lengthSitzhocker}</div>
                    <div onClick={handleLengthFurnitureAddSitzhocker} className="add">+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Drehstuhl") {
            return <SmallRectangle>
                <label>Länge</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleLengthFurnitureDecreaseDrehstuhl} className="decrease">-</div>
                    <div className="count"> {lengthDrehstuhl}</div>
                    <div onClick={handleLengthFurnitureAddDrehstuhl} className="add">+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Tisch") {
            return <SmallRectangle>
                <label>Länge</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleLengthFurnitureDecreaseTisch} className="decrease">-</div>
                    <div className="count"> {lengthTisch}</div>
                    <div onClick={handleLengthFurnitureAddTisch} className="add">+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Stuhl") {
            return <SmallRectangle>
                <label>Länge</label>
                <div className="daten-angabe content-space-between">
                    <div onClick={handleLengthFurnitureDecreaseStuhl} className="decrease">-</div>
                    <div className="count"> {lengthStuhl}</div>
                    <div onClick={handleLengthFurnitureAddStuhl} className="add">+</div>
                </div>
            </SmallRectangle >;
        }

    }


//#############################################################################################################################################################
    //WEIGHT HINZUFÜGEN
//#############################################################################################################################################################
    //GEWICHT NUR ANZEIGEN WENN SOFA + GEWICHT HINZUFÜGEN
    const handleAmountWeightAddSofa = () => {
        setWeightSofa(weightSofa + 25); //für das Gewicht vom Sofa, bei jedem Klick geupdatet
        setWeight(weightSofa + 25); //um das Gewicht allgemein auf das Gewicht vom Sofas zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //GEWICHT NUR ANZEIGEN WENN TISCH + GEWICHT HINZUFÜGEN
    const handleAmountWeightAddTisch = () => {
        setWeightTisch(weightTisch + 20); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setWeight(weightTisch + 20); //um das Gewicht allgemein auf das Gewicht vom Tisches zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //GEWICHT NUR ANZEIGEN WENN STUHL + GEWICHT HINZUFÜGEN
    const handleAmountWeightAddStuhl = () => {
        setWeightStuhl(weightStuhl + 10); //für das Gewicht vom Stuhl, bei jedem Klick geupdatet
        setWeight(weightStuhl + 10); //um das Gewicht allgemein auf das Gewicht vom Stuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //GEWICHT NUR ANZEIGEN WENN DREHSTUHL + GEWICHT HINZUFÜGEN
    const handleAmountWeightAddDrehstuhl = () => {
        setWeightDrehstuhl(weightDrehstuhl + 10); //für das Gewicht vom Drehstuhl, bei jedem Klick geupdatet
        setWeight(weightDrehstuhl + 10); //um das Gewicht allgemein auf das Gewicht vom Drehstuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //GEWICHT NUR ANZEIGEN WENN SITZHOCKER + GEWICHT HINZUFÜGEN
    const handleAmountWeightAddSitzhocker = () => {
        setWeightSitzhocker(weightSitzhocker + 5); //für das Gewicht vom Sitzhocker, bei jedem Klick geupdatet
        setWeight(weightSitzhocker + 5); //um das Gewicht allgemein auf das Gewicht vom Sitzhocker zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }


//#############################################################################################################################################################
    //WEIGHT REDUZIEREN
//#############################################################################################################################################################

    //GEWICHT NUR ANZEIGEN WENN SOFA + GEWICHT REDUZIEREN
    const handleAmountWeightDecreaseSofa = () => {
        setWeightSofa(weightSofa - 25); //für das Gewicht vom Sofa, bei jedem Klick geupdatet
        setWeight(weightSofa - 25); //um das Gewicht allgemein auf das Gewicht vom Sofas zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //GEWICHT NUR ANZEIGEN WENN TISCH + GEWICHT REDUZIEREN
    const handleAmountWeightDecreaseTisch = () => {
        setWeightTisch(weightTisch - 20); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setWeight(weightTisch - 20); //um das Gewicht allgemein auf das Gewicht vom Tisch zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //GEWICHT NUR ANZEIGEN WENN STUHL + GEWICHT REDUZIEREN
    const handleAmountWeightDecreaseStuhl = () => {
        setWeightStuhl(weightStuhl - 10); //für das Gewicht vom Stuhl, bei jedem Klick geupdatet
        setWeight(weightStuhl - 10); //um das Gewicht allgemein auf das Gewicht vom Stuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //GEWICHT NUR ANZEIGEN WENN DREHSTUHL + GEWICHT REDUZIEREN
    const handleAmountWeightDecreaseDrehstuhl = () => {
        setWeightDrehstuhl(weightDrehstuhl - 10); //für das Gewicht vom Drehstuhl, bei jedem Klick geupdatet
        setWeight(weightDrehstuhl - 10); //um das Gewicht allgemein auf das Gewicht vom Drehstuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //GEWICHT NUR ANZEIGEN WENN DREHSTUHL + GEWICHT REDUZIEREN
    const handleAmountWeightDecreaseSitzhocker = () => {
        setWeightSitzhocker(weightSitzhocker - 5); //für das Gewicht vom Sitzhocker, bei jedem Klick geupdatet
        setWeight(weightSitzhocker - 5); //um das Gewicht allgemein auf das Gewicht vom Sitzhocker zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }


//#############################################################################################################################################################
    // ANZAHL MÖBELSTÜCKE HINZUFÜGEN
//#############################################################################################################################################################

    //ANZAHL NUR ANZEIGEN WENN SOFA + ANZAHL HINZUFÜGEN
    const handleAmountIdenticalFurnitureAddSofa = () => {
        setAmountSofa(amountSofa + 1); //für das Gewicht vom Sofa, bei jedem Klick geupdatet
        setAmount(amountSofa + 1); //um das Gewicht allgemein auf das Gewicht vom Sofas zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //ANZAHL NUR ANZEIGEN WENN TISCH + ANZAHL HINZUFÜGEN
    const handleAmountIdenticalFurnitureAddTisch = () => {
        setAmountTisch(amountTisch + 1); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setAmount(amountTisch + 1); //um das Gewicht allgemein auf das Tisch vom Sofas zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //ANZAHL NUR ANZEIGEN WENN STUHL + ANZAHL HINZUFÜGEN
    const handleAmountIdenticalFurnitureAddStuhl = () => {
        setAmountStuhl(amountStuhl + 1); //für das Gewicht vom Stuhl, bei jedem Klick geupdatet
        setAmount(amountStuhl + 1); //um das Gewicht allgemein auf das Stuhl vom Sofas zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //ANZAHL NUR ANZEIGEN WENN DREHSTUHL + ANZAHL HINZUFÜGEN
    const handleAmountIdenticalFurnitureAddDrehstuhl = () => {
        setAmountDrehstuhl(amountDrehstuhl + 1); //für das Gewicht vom Drehstuhl, bei jedem Klick geupdatet
        setAmount(amountDrehstuhl + 1); //um das Gewicht allgemein auf das Drehstuhl vom Sofas zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //ANZAHL NUR ANZEIGEN WENN SITZHOCKER + ANZAHL HINZUFÜGEN
    const handleAmountIdenticalFurnitureAddSitzhocker = () => {
        setAmountSitzhocker(amountSitzhocker + 1); //für das Sitzhocker vom Sofa, bei jedem Klick geupdatet
        setAmount(amountSitzhocker + 1); //um das Gewicht allgemein auf das Sitzhocker vom Sofas zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

//#############################################################################################################################################################
    // ANZAHL MÖBELSTÜCKE REDUZIEREN
//#############################################################################################################################################################

    //ANZAHL NUR ANZEIGEN WENN SOFA + ANZAHL REDUZIEREN
    const handleIdenticalFurnitureDecreaseSofa = () => {
        setAmountSofa(amountSofa - 1); //für das Gewicht vom Sofa, bei jedem Klick geupdatet
        setAmount(weightSofa - 1); //um das Gewicht allgemein auf das Gewicht vom Sofas zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //ANZAHL NUR ANZEIGEN WENN TISCH + ANZAHL REDUZIEREN
    const handleIdenticalFurnitureDecreaseTisch = () => {
        setAmountTisch(amountTisch - 1); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setAmount(weightTisch - 1); //um das Gewicht allgemein auf das Gewicht vom Tisch zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //ANZAHL NUR ANZEIGEN WENN STUHL + ANZAHL REDUZIEREN
    const handleIdenticalFurnitureDecreaseStuhl = () => {
        setAmountStuhl(amountStuhl - 1); //für das Gewicht vom Stuhl, bei jedem Klick geupdatet
        setAmount(weightStuhl - 1); //um das Gewicht allgemein auf das Gewicht vom Stuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //ANZAHL NUR ANZEIGEN WENN DREHSTUHL + ANZAHL REDUZIEREN
    const handleIdenticalFurnitureDecreaseDrehstuhl = () => {
        setAmountDrehstuhl(amountDrehstuhl - 1); //für das Gewicht vom Drehstuhl, bei jedem Klick geupdatet
        setAmount(weightDrehstuhl - 1); //um das Gewicht allgemein auf das Gewicht vom Drehstuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //ANZAHL NUR ANZEIGEN WENN SITZHOCKER + ANZAHL REDUZIEREN
    const handleIdenticalFurnitureDecreaseSitzhocker = () => {
        setAmountSitzhocker(amountSitzhocker - 1); //für das Gewicht vom Sitzhocker, bei jedem Klick geupdatet
        setAmount(weightSitzhocker - 1); //um das Gewicht allgemein auf das Gewicht vom Sitzhocker zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }


//#############################################################################################################################################################
    // LÄNGE MÖBELSTÜCKE HINZUFÜGEN
//#############################################################################################################################################################

    //LÄNGE NUR ANZEIGEN WENN SOFA + LÄNGE HINZUFÜGEN
    const handleLengthFurnitureAddSofa = () => {
        setLengthSofa(lengthSofa + 25); //für das Gewicht vom Sofa, bei jedem Klick geupdatet
        setLength(lengthSofa + 25); //um das Gewicht allgemein auf das Gewicht vom Sofa zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN TISCH + LÄNGE HINZUFÜGEN
    const handleLengthFurnitureAddTisch = () => {
        setLengthTisch(lengthTisch + 20); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setLength(lengthTisch + 20); //um das Gewicht allgemein auf das Gewicht vom Tisch zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN STUHL + LÄNGE HINZUFÜGEN
    const handleLengthFurnitureAddStuhl = () => {
        setLengthStuhl(lengthStuhl + 10); //für das Gewicht vom Stuhl, bei jedem Klick geupdatet
        setLength(lengthStuhl + 10); //um das Gewicht allgemein auf das Gewicht vom Stuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN DREHSTUHL + LÄNGE HINZUFÜGEN
    const handleLengthFurnitureAddDrehstuhl = () => {
        setLengthDrehstuhl(lengthDrehstuhl + 10); //für das Gewicht vom Drehstuhl, bei jedem Klick geupdatet
        setLength(lengthDrehstuhl + 10); //um das Gewicht allgemein auf das Gewicht vom Drehstuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN SITZHOCKER + LÄNGE HINZUFÜGEN
    const handleLengthFurnitureAddSitzhocker = () => {
        setLengthSitzhocker(lengthSitzhocker + 5); //für das Gewicht vom Sitzhocker, bei jedem Klick geupdatet
        setLength(lengthSitzhocker + 5); //um das Gewicht allgemein auf das Gewicht vom Sitzhocker zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }



//#############################################################################################################################################################
    //LÄNGE MÖBELSTÜCKE REDUZIEREN
//#############################################################################################################################################################

    //LÄNGE NUR ANZEIGEN WENN SOFA + LÄNGE REDUZIEREN
    const handleLengthFurnitureDecreaseSofa = () => {
        setLengthSofa(lengthSofa - 25); //für das Gewicht vom Sofa, bei jedem Klick geupdatet
        setLength(lengthSofa - 25); //um das Gewicht allgemein auf das Gewicht vom Sofa zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN TISCH + LÄNGE REDUZIEREN
    const handleLengthFurnitureDecreaseTisch = () => {
        setLengthTisch(lengthTisch - 20); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setLength(lengthTisch - 20); //um das Gewicht allgemein auf das Gewicht vom Tisch zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN STUHL + LÄNGE REDUZIEREN
    const handleLengthFurnitureDecreaseStuhl = () => {
        setLengthStuhl(lengthStuhl - 10); //für das Gewicht vom Stuhl, bei jedem Klick geupdatet
        setLength(lengthStuhl - 10); //um das Gewicht allgemein auf das Gewicht vom Stuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN DREHSTUHL + LÄNGE REDUZIEREN
    const handleLengthFurnitureDecreaseDrehstuhl = () => {
        setLengthDrehstuhl(lengthDrehstuhl - 10); //für das Gewicht vom Drehstuhl, bei jedem Klick geupdatet
        setLength(lengthDrehstuhl - 10); //um das Gewicht allgemein auf das Gewicht vom Drehstuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN SITZHOCKER + LÄNGE REDUZIEREN
    const handleLengthFurnitureDecreaseSitzhocker = () => {
        setLengthSitzhocker(lengthSitzhocker - 5); //für das Gewicht vom Sitzhocker, bei jedem Klick geupdatet
        setLength(lengthSitzhocker - 5); //um das Gewicht allgemein auf das Gewicht vom Sitzhocker zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }




    return (
        <div className="secondary-background">
            <Header/>
    {/*########### In den Container wird das Kamera Canvas gepackt ##########*/}
            <div ref={divEl} id="webcam-container"></div>
    {/*########### Kamera anmachen ##########*/}
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
    {/*########### Kamera anmachen ##########*/}
                    <button onClick={handleClick} id="scan-starten">Scan starten</button>
                </>
            }
    {/*########### Foto machen, Kamera aus & Bild in Firebase lagern ##########*/}
            {step === 'scan' &&
                <>
    {/*########### Foto machen, Kamera aus & Bild in Firebase lagern ##########*/}
                    <button onClick={takePhoto} id="foto-machen">Foto machen</button>
                </>
            }
    {/*########### Bild aus Firebase laden  & Label laden ##########*/}
            {step === 'done' &&
            <>
    {/*########### Bild aus Firebase laden ##########*/}
                {imageUrl && <img className="imageurl" src={imageUrl}/>}
                <div>
                    {predictions
                        ? predictions.map((prediction) =>

                            <div id={prediction.className} key={prediction.className} className="Label-Klassen">
{/*########### nur das Label + Wahrscheinlichkeit mit der höchsten Wahrscheinlichkeit rausgefiltert ##########*/}
                                <h4>{getLabelIfIsHighestPropability(predictions, prediction)}</h4>
                            </div>)
                        : ''}
                </div>
                <button id="weiter-button"onClick={handleComplete}>Weiter</button>
            </>}
    {/*########### Möbeldaten angeben ##########*/}
            {step === 'data' &&
                <>
{/*########### vorher gemachte Foto ##########*/}
                    {imageUrl && <img className="imageurl" src={imageUrl}/>}
{/*########### nur das Label + Wahrscheinlichkeit mit der höchsten Wahrscheinlichkeit rausgefiltert ##########*/}
                    <div id="label-container">
                        {predictions
                            ? predictions.map((prediction) =>
                                <div id={prediction.className} key={prediction.className} className="Label-Klassen">

                                    <h4 className="margin-top-sm">{getLabelIfIsHighestPropability(predictions, prediction)}</h4>
{/*########### Länge, Anzahl & Gewicht, je nachdem welche Klasse ##########*/}
                                    <form className="moebel-data">
                                        <div>{getInputAmount(predictions, prediction)}</div>
                                        <div>{getInputWeight(predictions, prediction)}</div>
                                        <div>{getInputLength(predictions, prediction)}</div>
                                    </form>

                                </div>)
                            : ''}
                    </div>
                    <div className="data-container">
{/*########### Raum Auswahl##########*/}

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

{/*########### Besonderheiten Auswahl##########*/}

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
{/*########### zur Möbelliste hinzufügen ##########*/}
                        <button className="right" onClick={() => addMoebel()}> Hinzufügen</button>
                    </div>

                </>}
            <TapBarList/>
        </div>
    );
}


export default TestMoebelerkennung;
