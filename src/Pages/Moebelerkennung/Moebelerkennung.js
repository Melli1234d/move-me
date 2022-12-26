import './Moebelerkennung.css'
import React from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
 //CODE VON WEBSITE: https://medium.com/@baruahd5/create-image-classifier-with-node-js-tensorflow-js-google-teachable-machine-280ee5f92bad
const Moebelerkennung = (props) => {
    const URL = '../static/tm-my-image-model';

    let model, webcam, maxPredictions, barhocker, buerostuhl, drehhocker, sofa, stuehle, tisch;
    let refresh = true;

// Load the image model and setup the webcam
    async function init() {
        if (refresh) {
            refresh = false;
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            // load the model and metadata
            model = await tf.loadGraphModel(modelURL, metadataURL);
            //model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();

            // Convenience function to setup a webcam
            const flip = true; // whether to flip the webcam
            webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
            await webcam.setup(); // request access to the webcam
            await webcam.play();
            // append elements to the DOM
            document.getElementById("webcam-container").appendChild(webcam.canvas);
            barhocker = document.getElementById("barhocker");
            buerostuhl = document.getElementById("bürostuhl");
            drehhocker = document.getElementById("drehhocker");
            sofa = document.getElementById("sofa");
            stuehle = document.getElementById("stühle");
            tisch = document.getElementById("tisch");
            window.requestAnimationFrame(loop);
        }
        else {

            // eslint-disable-next-line no-restricted-globals
            location.reload();
        }

    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

// run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].className == "Barhocker") {
                barhocker.innerHTML = prediction[i].probability.toFixed(2);
                document.getElementById("barhocker-progress").value = prediction[i].probability.toFixed(2);
            }
            if (prediction[i].className == "Bürostuhl") {
                buerostuhl.innerHTML = prediction[i].probability.toFixed(2);
                document.getElementById("bürostuhl-progress").value = prediction[i].probability.toFixed(2);
            }
            if (prediction[i].className == "Drehhocker") {
                drehhocker.innerHTML = prediction[i].probability.toFixed(2);
                document.getElementById("drehhocker-progress").value = prediction[i].probability.toFixed(2);
            }
            if (prediction[i].className == "Sofa") {
                sofa.innerHTML = prediction[i].probability.toFixed(2);
                document.getElementById("sofa-progress").value = prediction[i].probability.toFixed(2);
            }
            if (prediction[i].className == "Stühle") {
                stuehle.innerHTML = prediction[i].probability.toFixed(2);
                document.getElementById("stühle-progress").value = prediction[i].probability.toFixed(2);
            }
            if (prediction[i].className == "Tisch") {
                tisch.innerHTML = prediction[i].probability.toFixed(2);
                document.getElementById("tisch-progress").value = prediction[i].probability.toFixed(2);
            }
        }
    }


    return (

        <div className="c-backbutton__container">
            <h2> Möbelerkennung</h2>

            <div className="wrapper">
                <button onClick={init}>Start</button>
                <div id="webcam-container"/>
                <div id="label" className="label">
                    <ul>
                        <li>Barhocker:
                            <progress id="barhocker-progress" max="1"/>
                            <span id="barhocker"/></li>
                        <li>Bürostuhl:
                            <progress id="bürostuhl-progress" max="1"/>
                            <span id="bürostuhl"/></li>
                        <li>Drehhocker:
                            <progress id="drehhocker-progress" max="1"/>
                            <span id="drehhocker"/></li>
                        <li>Sofa:
                            <progress id="sofa-progress" max="1"/>
                            <span id="sofa"/></li>
                        <li>Stühle:
                            <progress id="stühle-progress" max="1"/>
                            <span id="stühle"/></li>
                        <li>Tisch:
                            <progress id="tisch-progress" max="1"/>
                            <span id="tisch"/></li>
                    </ul>
                </div>

            </div>



        </div>
    );
}

export default Moebelerkennung;
