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


//Code angelehnt an Code Beispiel der automatisch von Teachable Machine generiert wird
//Code Foto machen: https://www.youtube.com/watch?v=0iteBJ-fuRA&t=311s
// Code Photo nach Firebase hochladen: tutorial: https://www.youtube.com/watch?v=YOAeBSCkArA&t=84s or github: https://github.com/machadop1407/firebase-file-upload
//const URL = 'tm-my-image-model-5/';

const TestMoebelerkennung = (props) => {
    const [hasPhoto, setHasPhoto] = useState(false);
    const tm = useContext(TeachableMachineContext);

    const [isPredicting, setPredicting] = useState(false);
    const [predictions, setPredictions] = useState(null);

    const [furniture, setFurniture] = useState();
    const furnitureCollectionRef = collection(firestore, "furniture-data");
    //FOTOUPLOAD

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const unique_id = v4();
    const storage = getStorage();
    //Umwandeln in ein PNG da es vorher ein octet-stream war und das bild sonst nicht angezeigt werden kann!!
    const metadata = {
        contentType: 'image/png',
    };

    const imagesListRef = ref(storage, "images/");

    //Beim Klick auf Button soll das Bild in Firebase geuploadet werden
    const uploadImage = () => {
        addDoc(furnitureCollectionRef,{
            furniture:furniture,
        })
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${v4()}`); //namen für bild samndom angeben
        //Bilder hochladen in den storage: das gesetzte Bild mit dem definierten namen als png...
        uploadBytes(imageRef, imageUpload, metadata, photo).then((snapshot) => {

            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
                console.log(metadata);
            });
        });
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);


//KAMERA CONTAINER

    const divEl = useRef(null);
//Animation Frame läuft immer
    useAnimationFrame(deltaTime => {

        if (tm.started) {
            tm.webcam.update(); //webcam wird immer geupdatet, damit neustes build entsteht
            tm.model.predict(tm.webcam.canvas).then(setPredictions) //vorhersagen der erkannten Klassen werden gesetzt
            /*if (tm.model.predict(tm.webcam.canvas)) {
                console.log(predictions);
            }*/
        } else if (tm.stoped) {
            tm.webcam.update();
            tm.webcam.stop();
            console.log("ended");
        }
    })


    var predictionlabels = document.getElementsByClassName("Label-Klassen");


    //Funktion für alle labels
    function getHighestPrediction(predictionlabels) {
        //predictionlabels
        let highestPrediction = null; //auch nullwert muss erlaubt sein, kann ausversehen mitgegeben werden
        for(let prediction of predictionlabels) { //schleife die die wahrscheinlichkeit der labels prüft
            if(highestPrediction === null) { //wenn höchste wahrschenlichkeit kein wert hat
                if(prediction.probability > 0.3) { //prüfen ob wahrscheinlichkeit größer als 30% ist dann ist die höchste wahrscheinlichkeit die aktuelle wahrscheinlichkeit
                    highestPrediction = prediction;
                }

            } else if(highestPrediction != null && prediction.probability > highestPrediction.probability){ //wenn höchte wahrscheinlichkeit ungleich null und die wahrscheinlichkeit größer als die höchste wahrschinlichkeit, dann höchste wahrscheinlichkeit als wahrscheinlichkeit
                highestPrediction = prediction;
            }
        }
        return highestPrediction; //wiedergeben der höchsten wahrscheinlichkeit
    }

    //fuktion die das Label wiedegibt wenn höchste wahrscheinlichkeit gesetzt
    function getLabelIfIsHighestPropability(predictionlabels, predictionlabel) { //alle label und das einzelne als wert mitgegeben
        let highestLabel= getHighestPrediction(predictionlabels); //funktion aufrufen mit allen labeln
        if(predictionlabel === highestLabel) {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return predictionlabel.className + ": " + (predictionlabel.probability * 100).toFixed(2) + "%";
        } else { //wenn nciht bleib leer
            return '';
        }
    }


    //WENN BUTTON GEKLICKT, DANN FOTO MACHEN


    let photoRef = useRef(null); //foto am anfang leer
    let video = document.querySelector('#webcam-container canvas'); //das element von dem das foto gemacht wird
    let photo = document.querySelector('.photo canvas'); //foto muss ein canvas sein

    const takePhoto = async () => {
        //await tm.stop();

        await tm.stop();//kamera geht aus wenn foto gemacht wird
        photoRef.current.appendChild(video); // div element wird hinzugefügt
        setPredicting(false); //aufhören klassen anzuzeigen
        console.log(video);
        console.log(photo);
        //console.log(photoCanvas);
        let ctx = photo.getContext('2d');  //foto context wird gebraucht
        ctx.drawImage(video, 0, 0, video.width, video.height); //foto wird abgebildet
        setHasPhoto(true); //foto wurde gemacht
        setPredictions(false);
        setImageUpload(true);
        console.log(imageUpload)
        tm.webcam.canvas.remove(); //camera Canvas wird removt wenn Foto aufgenommen
        setFurniture(unique_id);

    }


    //WENN BUTTON GEKLICKT, DANN KAMERA STARTEN

    //funktioniert
    //beim Button klicken soll die Kamera angehen, die Vorhersagen werden abgebildet und das Kamera Bild wird angezeigt
    const handleClick = async () => {
        //const maxPredictions = 1;
        await tm.start(); //starten

        divEl.current.appendChild(tm.webcam.canvas); //in dem div das webcam canvas erscheinen lassen*/
        setPredicting(true); //die klassen sollen jetzt angehen


    }


    return (


        <div className="secondary-background">
            <Header/>
            <div ref={divEl} id="webcam-container"></div>
            <div ref={photoRef} className="photo">
                <canvas width={200} height={200}/>
            </div>


            <div id="label-container">
                {predictions
                    ? predictions.map((prediction) =>
                        <div id={prediction.className} key={prediction.className} className="Label-Klassen">
                            {getLabelIfIsHighestPropability(predictions, prediction)}
                        </div>)
                    : ''}
            </div>


            <button onClick={handleClick}>Scann starten</button>
            <button onClick={takePhoto}>Foto machen</button>
            <Link to="/Moebelangaben">
                <button onClick={uploadImage}>weiter</button>
            </Link>
            <TapBarList/>
        </div>
    );
}


export default TestMoebelerkennung;
