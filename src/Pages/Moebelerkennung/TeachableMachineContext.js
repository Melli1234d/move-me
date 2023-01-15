import * as tmImage from "@teachablemachine/image";
import React from 'react';
const URL = 'tm-my-image-model-5/';

//Code angelehnt an Code Beispiel der automatisch von Teachable Machine generiert wird

const TeachableMachineWrapper = {
    async start(){
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        const model = await tmImage.load(modelURL, metadataURL);

        const maxPredictions = await model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        const webcam = new tmImage.Webcam(200, 200, flip, maxPredictions); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play(); //webcam geht an

        this.maxprediction = maxPredictions;
        this.model = model;

        this.webcam = webcam;
        this.started = true; //wird gestartet
    },
//funktioniert noch nicht
    async stop(){

        // Convenience function to setup a webcam
        const webcam = this.webcam //vorherige webcam ansprechen
        await webcam.setup(); // request access to the webcam
        await webcam.stop();//webcam geht  aus


        this.webcam = webcam;
        this.stoped = true; //wird gestoppt

    }

}

// eslint-disable-next-line no-undef
export const TeachableMachineContext = React.createContext(TeachableMachineWrapper)
