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
    const [amount, setAmount] = useState();// Allgemeine Anzahl der Möbelstücke, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [amountSofa, setAmountSofa] = useState(2);// count für Sofa Anzahl
    const [amountTisch, setAmountTisch] = useState(1); //count für Tisch Anzahl
    const [amountStuhl, setAmountStuhl] = useState(4);//count für Stuhl Anzahl
    const [amountDrehstuhl, setAmountDrehstuhl] = useState(1);//count für Drehstuhl Anzahl
    const [amountSitzhocker, setAmountSitzhocker] = useState(1);//count für Sofa Anzahl
    const [length, setLength] = useState();// Allgemeine Länge der Längsten Seite des Möbelstückes, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [lengthSofa, setLengthSofa] = useState(200);// count für Sofa Anzahl
    const [lengthTisch, setLengthTisch] = useState(160); //count für Tisch Anzahl
    const [lengthStuhl, setLengthStuhl] = useState(120);//count für Stuhl Anzahl
    const [lengthDrehstuhl, setLengthDrehstuhl] = useState(100);//count für Drehstuhl Anzahl
    const [lengthSitzhocker, setLengthSitzhocker] = useState(60);//count für Sofa Anzahl
    const [weight, setWeight] = useState();// Allgemeines Gewicht, was in Firebase gespeichert wird, gesetzt je nach Klasse
    const [weightSofa, setWeightSofa] = useState(100);// count für Sofa Gewicht
    const [weightTisch, setWeightTisch] = useState(50);// count für Tisch Gewicht
    const [weightStuhl, setWeightStuhl] = useState(20);// count für Stuhl Gewicht
    const [weightDrehstuhl, setWeightDrehstuhl] = useState(60);// count für Tisch Gewicht
    const [weightSitzhocker, setWeightSitzhocker] = useState(15);// count für Tisch Gewicht
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




    //bestimme die höchste Wahrscheinlickeit von allen
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

    //fuktion die das Label der höchsten Wahrscheinlichkeit wiedergibt, wenn höchste Wahrscheinlichkeit gesetzt
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


    //########## WEIGHT HINZUFÜGEN ############################################

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

    //########## WEIGHT REDUZIEREN ############################################

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



    //########## ANZAHL MÖBELSTÜCKE HINZUFÜGEN ############################################

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


    //########## ANZAHL MÖBELSTÜCKE REDUZIEREN ############################################

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



    //########## LÄNGE MÖBELSTÜCKE HINZUFÜGEN ############################################

    //LÄNGE NUR ANZEIGEN WENN SOFA + LÄNGE HINZUFÜGEN
    const handleLengthFurnitureAddSofa = () => {
        setLengthSofa(lengthSofa + 25); //für das Gewicht vom Sofa, bei jedem Klick geupdatet
        setAmount(lengthSofa + 25); //um das Gewicht allgemein auf das Gewicht vom Sofa zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN TISCH + LÄNGE HINZUFÜGEN
    const handleLengthFurnitureAddTisch = () => {
        setLengthTisch(lengthTisch + 20); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setAmount(lengthTisch + 20); //um das Gewicht allgemein auf das Gewicht vom Tisch zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN STUHL + LÄNGE HINZUFÜGEN
    const handleLengthFurnitureAddStuhl = () => {
        setLengthStuhl(lengthStuhl + 10); //für das Gewicht vom Stuhl, bei jedem Klick geupdatet
        setAmount(lengthStuhl + 10); //um das Gewicht allgemein auf das Gewicht vom Stuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN DREHSTUHL + LÄNGE HINZUFÜGEN
    const handleLengthFurnitureAddDrehstuhl = () => {
        setLengthDrehstuhl(lengthDrehstuhl + 10); //für das Gewicht vom Drehstuhl, bei jedem Klick geupdatet
        setAmount(lengthDrehstuhl + 10); //um das Gewicht allgemein auf das Gewicht vom Drehstuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN SITZHOCKER + LÄNGE HINZUFÜGEN
    const handleLengthFurnitureAddSitzhocker = () => {
        setLengthSitzhocker(lengthSitzhocker + 5); //für das Gewicht vom Sitzhocker, bei jedem Klick geupdatet
        setAmount(lengthSitzhocker + 5); //um das Gewicht allgemein auf das Gewicht vom Sitzhocker zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }




    //########## LÄNGE MÖBELSTÜCKE REDUZIEREN ############################################

    //LÄNGE NUR ANZEIGEN WENN SOFA + LÄNGE REDUZIEREN
    const handleLengthFurnitureDecreaseSofa = () => {
        setLengthSofa(lengthSofa - 25); //für das Gewicht vom Sofa, bei jedem Klick geupdatet
        setAmount(lengthSofa - 25); //um das Gewicht allgemein auf das Gewicht vom Sofa zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN TISCH + LÄNGE REDUZIEREN
    const handleLengthFurnitureDecreaseTisch = () => {
        setLengthTisch(lengthTisch - 20); //für das Gewicht vom Tisch, bei jedem Klick geupdatet
        setAmount(lengthTisch - 20); //um das Gewicht allgemein auf das Gewicht vom Tisch zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN STUHL + LÄNGE REDUZIEREN
    const handleLengthFurnitureDecreaseStuhl = () => {
        setLengthStuhl(lengthStuhl - 10); //für das Gewicht vom Stuhl, bei jedem Klick geupdatet
        setAmount(lengthStuhl - 10); //um das Gewicht allgemein auf das Gewicht vom Stuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN DREHSTUHL + LÄNGE REDUZIEREN
    const handleLengthFurnitureDecreaseDrehstuhl = () => {
        setLengthDrehstuhl(lengthDrehstuhl - 10); //für das Gewicht vom Drehstuhl, bei jedem Klick geupdatet
        setAmount(lengthDrehstuhl - 10); //um das Gewicht allgemein auf das Gewicht vom Drehstuhl zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }

    //LÄNGE NUR ANZEIGEN WENN SITZHOCKER + LÄNGE REDUZIEREN
    const handleLengthFurnitureDecreaseSitzhocker = () => {
        setLengthSitzhocker(lengthSitzhocker - 5); //für das Gewicht vom Sitzhocker, bei jedem Klick geupdatet
        setAmount(lengthSitzhocker - 5); //um das Gewicht allgemein auf das Gewicht vom Sitzhocker zu setzen im Möbelstück, was in Firebase gespeichert wird;
    }
















//################## WIEDERGABE BESTIMMTER INHALTE ZU LÄNGE, GEWICHT, ANZAHL CONTAINER BEI MÖBELANGABE  #####################################################################################

    //FUNKTION UM DAS FELD FÜR ANZAHL ANZUZEIGEN BEI DEN MÖBELANGABEN
    function getInputAmount(predictions, prediction) {//alle label und das einzelne als wert mitgegeben
        let highestLabel = getHighestPrediction(predictions);//funktion aufrufen mit allen labeln
        if (prediction === highestLabel && prediction.className==="Sofa") {
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="container-row">
                    <div onClick={handleIdenticalFurnitureDecreaseSofa}>-</div>
                    <div className="count"> {amountSofa}</div>
                    <div onClick={handleAmountIdenticalFurnitureAddSofa}>+</div>
                </div>
            </SmallRectangle >;
        }
        else if(prediction === highestLabel && prediction.className==="Sitzhocker") {
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="container-row">
                    <div onClick={handleIdenticalFurnitureDecreaseSitzhocker}>-</div>
                    <div className="count"> {amountSitzhocker}</div>
                    <div onClick={handleAmountIdenticalFurnitureAddSitzhocker}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Drehstuhl") {
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="container-row">
                    <div onClick={handleIdenticalFurnitureDecreaseDrehstuhl}>-</div>
                    <div className="count"> {amountDrehstuhl}</div>
                    <div onClick={handleAmountIdenticalFurnitureAddDrehstuhl}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Tisch") {
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="container-row">
                    <div onClick={handleIdenticalFurnitureDecreaseTisch}>-</div>
                    <div className="count"> {amountTisch}</div>
                    <div onClick={handleAmountIdenticalFurnitureAddTisch}>+</div>
                </div>
            </SmallRectangle >;
        }else if(prediction === highestLabel && prediction.className==="Stuhl") {
            return <SmallRectangle>
                <label>Anzahl</label>
                <div className="container-row">
                    <div onClick={handleIdenticalFurnitureDecreaseStuhl}>-</div>
                    <div className="count"> {amountStuhl}</div>
                    <div onClick={handleAmountIdenticalFurnitureAddStuhl}>+</div>
                </div>
            </SmallRectangle >;
        }

    }

    //FUNKTION UM DAS FELD FÜR GEWICHT ANZUZEIGEN BEI DEN MÖBELANGABEN
    function getInputWeight(predictions, prediction) {//alle label und das einzelne als wert mitgegeben
        let highestLabel = getHighestPrediction(predictions);//funktion aufrufen mit allen labeln
        //wenn Vorhersage gleich das Label mit der höchsten Wahrscheinlichkeit ist
        if (prediction === highestLabel && prediction.className==="Sofa") {
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="container-row">
                    <div onClick={handleAmountWeightDecreaseSofa}>-</div>
                    <div className="count"> {weightSofa}</div>
                    <div onClick={handleAmountWeightAddSofa}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Sitzhocker") {
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="container-row">
                    <div onClick={handleAmountWeightDecreaseSitzhocker}>-</div>
                    <div className="count"> {weightSitzhocker}</div>
                    <div onClick={handleAmountWeightAddSitzhocker}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Drehstuhl") {
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="container-row">
                    <div onClick={handleAmountWeightDecreaseDrehstuhl}>-</div>
                    <div className="count"> {weightDrehstuhl}</div>
                    <div onClick={handleAmountWeightAddDrehstuhl}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Tisch") {
            return <SmallRectangle>
                <label>Gewicht</label>
                <div className="container-row">
                    <div onClick={handleAmountWeightDecreaseTisch}>-</div>
                    <div className="count"> {weightTisch}</div>
                    <div onClick={handleAmountWeightAddTisch}>+</div>
                </div>
            </SmallRectangle >;
        }else if(prediction === highestLabel && prediction.className==="Stuhl") {
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

    //FUNKTION UM DAS FELD FÜR LÄNGE ANZUZEIGEN BEI DEN MÖBELANGABEN
    function getInputLength(predictions, prediction) {//alle label und das einzelne als wert mitgegeben
        let highestLabel = getHighestPrediction(predictions);//funktion aufrufen mit allen labeln
        if (prediction === highestLabel && prediction.className==="Sofa") {
            return <SmallRectangle>
                <label>Länge</label>
                <div className="container-row">
                    <div onClick={handleLengthFurnitureDecreaseSofa}>-</div>
                    <div className="count"> {lengthSofa}</div>
                    <div onClick={handleLengthFurnitureAddSofa}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Sitzhocker") {
            return <SmallRectangle>
                <label>Länge</label>
                <div className="container-row">
                    <div onClick={handleLengthFurnitureDecreaseSitzhocker}>-</div>
                    <div className="count"> {lengthSitzhocker}</div>
                    <div onClick={handleLengthFurnitureAddSitzhocker}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Drehstuhl") {
            return <SmallRectangle>
                <label>Länge</label>
                <div className="container-row">
                    <div onClick={handleLengthFurnitureDecreaseDrehstuhl}>-</div>
                    <div className="count"> {lengthDrehstuhl}</div>
                    <div onClick={handleLengthFurnitureAddDrehstuhl}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Tisch") {
            return <SmallRectangle>
                <label>Länge</label>
                <div className="container-row">
                    <div onClick={handleLengthFurnitureDecreaseTisch}>-</div>
                    <div className="count"> {lengthTisch}</div>
                    <div onClick={handleLengthFurnitureAddTisch}>+</div>
                </div>
            </SmallRectangle >;
        } else if(prediction === highestLabel && prediction.className==="Stuhl") {
            return <SmallRectangle>
                <label>Länge</label>
                <div className="container-row">
                    <div onClick={handleLengthFurnitureDecreaseStuhl}>-</div>
                    <div className="count"> {lengthStuhl}</div>
                    <div onClick={handleLengthFurnitureAddStuhl}>+</div>
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
        divEl.current.appendChild(tm.webcam.canvas); //in dem div das webcam canvas erscheinen lassen*/
        setPredicting(true); //die klassen sollen jetzt angehen
        setStep('scan');

    }



    //beim Klick auf den Button werden sie Sachen an Firebase geschickt
    const handleComplete = ()=>{
        setStep('data');
    }

    //setze auf Schritt "info" & Füge Möbelstück hinzu (id, Anzahl,Länge,Gewicht,Raum,Besonderheiten,Url des Bildes, labels[])
    const handleDone = ()=>{
        setStep('info');

        // neues möbelstück anlegen in der collection "moebel-data"
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
    {/*########### Kamera anmachen ##########*/}
                    <button onClick={handleClick} id="scan-starten">Scan starten</button>
                </>
            }
            {step === 'scan' &&
                <>
    {/*########### Foto machen, Kamera aus & Bild in Firebase lagern ##########*/}
                    <button onClick={takePhoto} id="foto-machen">Foto machen</button>
                </>
            }
            {step === 'done' &&
            <>
    {/*########### Bild aus Firebase laden ##########*/}
                {imageUrl && <img className="imageurl" src={imageUrl}/>}
                <div id="label-container">
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

            {step === 'data' &&
                <>
{/*########### vorher gemachte Foto ##########*/}
                    {imageUrl && <img className="imageurl" src={imageUrl}/>}
{/*########### nur das Label + Wahrscheinlichkeit mit der höchsten Wahrscheinlichkeit rausgefiltert ##########*/}
                    <div id="label-container">
                        {predictions
                            ? predictions.map((prediction) =>
                                <div id={prediction.className} key={prediction.className} className="Label-Klassen">

                                    <h4>{getLabelIfIsHighestPropability(predictions, prediction)}</h4>
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
                        <button className="right" onClick={handleDone}> Hinzufügen</button>
                    </div>

                </>}
            <TapBarList/>
        </div>
    );
}


export default TestMoebelerkennung;
