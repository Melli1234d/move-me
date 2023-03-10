import * as tmImage from "@teachablemachine/image";
import React from 'react';


//#############################################################################################################################################################
//CODE: https://reactjs.org/docs/context.html
//CODE:  angelehnt an Code Beispiel der automatisch von Teachable Machine generiert wird
//#############################################################################################################################################################


const URL = 'tm-my-image-model/'; //definieren des Pfades von dem Teachable Machine Modell
const TeachableMachineWrapper = {
//#############################################################################################################################################################
// KAMERA STARTEN & MODEL DEFINIEREN
//#############################################################################################################################################################
    async start(){
        const modelURL = URL + "model.json"; //definieren des Pfades
        const metadataURL = URL + "metadata.json"; //definieren des Pfades
        const model = await tmImage.load(modelURL, metadataURL); //dem model wird die url und die metadaten mit gegeben, Modell wird geladen
        const flip = true; // kamera umdrehen
        const webcam = new tmImage.Webcam(200, 200, flip); // neue Camera Webcam erstellen mit breite, höhe und gefliptem Bild im Container
        await webcam.setup({ facingMode: "environment" }); // Zugang zur Kamera anfragen
        await webcam.play(); //webcam geht an
        this.model = model; //das aktuelle model ist das modell
        this.webcam = webcam; //die aktuelle webcam ist die webcam
        this.started = true; //wird gestartet
    },
//#############################################################################################################################################################
// KAMERA STOPPEN
//#############################################################################################################################################################
    async stop(){
        await this.webcam.stop() // vorherige definierte webcam ansprechen & stoppen
        this.started = false; // wird gestoppt
    }
}

// eslint-disable-next-line no-undef
export const TeachableMachineContext = React.createContext(TeachableMachineWrapper) //Context erstellen
