import './Moebelerkennung.css'
import React, {useContext, useEffect, useRef, useState} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import {TeachableMachineContext} from "./TeachableMachineContext";
import {useAnimationFrame} from "./useAnimationFrame";
import Header from "../../components/Header/Header";
import TapBarList from "../../components/TapBar/TapBarList";
import {Link} from "react-router-dom";


//const URL = 'tm-my-image-model-5/';

const TestMoebelerkennung = (props) => {

    const tm = useContext(TeachableMachineContext);


    const [isPredicting, setPredicting] = useState(false);
    const [predictions, setPredictions] = useState();
   /* useEffect(async ()=> {



    })*/
   /* const TeachableMachine = require("@sashido/teachablemachine-node");

    const model = new TeachableMachine({
        modelUrl: "https://teachablemachine.withgoogle.com/models/r6BBk-hiN/"
    });

    model.classify({
        imageUrl: "https://media-blog.sashido.io/content/images/2020/09/SashiDo_Dog.jpg",
    }).then((predictions) => {
        console.log("Predictions:", predictions);
    }).catch((e) => {
        console.log("ERROR", e);
    });*/

    const divEl = useRef(null);
//Animation Frame läuft immer
    useAnimationFrame(deltaTime => {
        if(tm.started){
            tm.webcam.update(); //webcam wird immer geupdatet, damit neustes build entsteht
            tm.model.predict(tm.webcam.canvas).then(setPredictions) //vorhersagen der erkannten Klassen werden gesetzt

            //for (let i = 0; i < maxPredictions; i++) {
            //    const classPrediction =
            //        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            //    labelContainer.childNodes[i].innerHTML = classPrediction;
            //}
        }
        if(tm.stopped){
            tm.webcam.stop();
        }
    })
//beim Button klicken soll die Kamera angehen, die Vorhersagen werden abgebildet und das Kamera Bild wird angezeigt
    const handleClick = async () => {
        await tm.start();
        divEl.current.appendChild(tm.webcam.canvas);
        setPredicting(true);
    }

    /*const handleStop = async () => {
        await tm.stop();
    }*/


    return (



        <div className="primary-background">
            <Header/>
            {/*<button type="button" onClick={}{init()}>Start</button>*/}
            <div ref={divEl} id="webcam-container"></div>
            <div id="label-container">
                {predictions
                    ? predictions.map((prediction) =>
                <div key={prediction.className}>
                    { prediction.className + ": " + prediction.probability.toFixed(2) }
                </div>)
                : 'No predictions yet'}
            </div>

            <button onClick={handleClick}>add something</button>
            <button /*{onClick={handleStop}}*/>Foto machen</button>
            <Link to="/Moebelangaben">
                <button /*{onClick={handleStop}}*/>weiter</button>
            </Link>
            <TapBarList/>
        </div>
    );
}


export default TestMoebelerkennung;
