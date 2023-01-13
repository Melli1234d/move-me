import './Moebelerkennung.css'
import React, {useContext, useEffect, useRef, useState} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
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


//Code angelehnt an Code Beispiel der automatisch von Teachable Machine generiert wird
// Code Photo nach Firebase hochladen: tutorial: https://www.youtube.com/watch?v=YOAeBSCkArA&t=84s or github: https://github.com/machadop1407/firebase-file-upload
//const URL = 'tm-my-image-model-5/';

const TestMoebelerkennung = (props) => {
    const [hasPhoto, setHasPhoto]=useState(false);
    const tm = useContext(TeachableMachineContext);

    const [isPredicting, setPredicting] = useState(false);
    const [predictions, setPredictions] = useState(null);

    //FOTOUPLOAD

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const unique_id = v4();
    const storage = getStorage();
    const imagesListRef = ref(storage, "images/");

    //Beim Klick auf Button soll das Bild in Firebase geuploadet werden
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${v4()+'.png' }`); //namen für bild samndom angeben
        uploadBytes(imageRef, imageUpload).then((snapshot) => {

            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
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

        if(tm.started){
            tm.webcam.update(); //webcam wird immer geupdatet, damit neustes build entsteht
            tm.model.predict(tm.webcam.canvas).then(setPredictions) //vorhersagen der erkannten Klassen werden gesetzt

        }
        if(tm.stopped){
            tm.webcam.stop();

        }
    })



    // Switch name von ClassNames
    function showTextonLabels(predictions) {
        switch (predictions) {
            case "Drehhocker":
                return "Drehhocker";
            case "Drehstuhl":
                return "Drehstuhl";
            case "Sofa":
                return "Sofa";
            case "Stuhl":
                return "Stuhl";
            case "Tisch":
                return "Tisch";
            default:
                return "Es wurde ncihts erkannt";
        }
    }



    //WENN BUTTON GEKLICKT, DANN FOTO MACHEN


    let photoRef = useRef(null); //foto am anfang leer

    const takePhoto= async () => {
        //await tm.stop();
        let video = document.querySelector('#webcam-container canvas'); //das element von dem das foto gemacht wird
        let photo = document.querySelector('.photo canvas'); //foto muss ein canvas sein
        photoRef.current.appendChild(video); // div element wird hinzugefügt
        console.log(video);
        console.log(photo);
        //console.log(photoCanvas);
        let ctx= photo.getContext('2d');  //foto context wird gebraucht
        ctx.drawImage(video, 0,0,video.width,video.height); //foto wird abgebildet
        setHasPhoto(true); //foto wurde gemacht
        setPredicting(false);
        setPredictions(false);
        setImageUpload(hasPhoto);
        //await tm.stop();
        tm.webcam.canvas.remove(); //camera Canvas wird removt wenn Foto aufgenommen

    }



    //WENN BUTTON GEKLICKT, DANN KAMERA STARTEN

    //funktioniert
//beim Button klicken soll die Kamera angehen, die Vorhersagen werden abgebildet und das Kamera Bild wird angezeigt
    const handleClick = async () => {

        await tm.start(); //starten
        divEl.current.appendChild(tm.webcam.canvas); //in dem div das webcam canvas erscheinen lassen
        setPredicting(true); //die klassen sollen jetzt angehen
    }

    //WENN BUTTON GEKLICKT, DANN CAMERA STOPPEN
//funktioniert nicht
  /*  const handleStop = async () => {
        await tm.stop();
    }*/


    return (



        <div className="primary-background">
            <Header/>
            {/*<button type="button" onClick={}{init()}>Start</button>*/}
            <div ref={divEl} id="webcam-container"></div>
            <div ref={photoRef} className="photo"><canvas width={200} height={200}/></div>


            <div id="label-container">
                {predictions
                    ? predictions.map((prediction) =>
                <div key={prediction.className}>
                    {/*{showTextonLabels + ": " + (prediction.probability * 100).toFixed(2) + "%"}*/}
                    { prediction.className + ": " + (prediction.probability * 100).toFixed(2) + "%"} {/*auf 2 nachkomma stellen aufgerundet*/}
                </div>)
                : 'No predictions yet'}
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
