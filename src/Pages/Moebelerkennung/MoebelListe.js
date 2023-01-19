import './Moebelerkennung.css'
import React, {useContext, useEffect, useState} from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import {
    onSnapshot,
    collection,
} from 'firebase/firestore';
import {firebase, firestore} from "../../firebase";

import MoebellistItem from "../../components/Möbelliste/MoebellistItem";
import Verpackung from "../../components/Pictures/MoebelAngaben/verpckung.png";
import Zerbrechlich from "../../components/Pictures/MoebelAngaben/zerbrechlich.png";
import Kratzer from "../../components/Pictures/MoebelAngaben/kratzer.png";
import moebelAngaben from "./MoebelAngaben";
import Kitchen from "../../components/Pictures/Moebel-Angaben/Raum/kitchen.png";
import Bedroom from "../../components/Pictures/Moebel-Angaben/Raum/bedroom.png";
import Livingroom from "../../components/Pictures/Moebel-Angaben/Raum/Wohnzimmer-white.png";
import RoundButton from "../../components/UI/RoundButton";
import SmallHighRoundRectangle from "../../components/UI/SmallHighRoundRectangle";


//tutorial: https://www.youtube.com/watch?v=ad6IavyAHsQ&t=328s
//tutorial: https://www.youtube.com/watch?v=3ZEz-iposj8
//link: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js
// code: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js

//Möbelliste

const MoebelListe = (besonderheiten) => {


    const colletionRef = collection(firestore, 'moebel-data');
    const [moebelData, setMoebelData] = useState([]);
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        setLoading(true);
        // const unsub = onSnapshot(q, (querySnapshot) => {
        const unsub = onSnapshot(colletionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setMoebelData(items);
            setLoading(false);
        });
        return () => {
            unsub();

        };

        // eslint-disable-next-line
    }, []);



/*    //versuch den String in ein Icon umzuwandeln!
    useEffect(() => {
        if (besonderheiten) {
            stringToIcon()
        }
    }, [besonderheiten]);


    function stringToIcon() {

        if (besonderheiten=== "Verpackung") {
            return <img id="verpackung-img" src={Verpackung} alt="Kitchen" height={18} width={18} />
        }
        else if (besonderheiten === "Zerbrechlich") {
            return <img id="zerbrechlich-img" src={Zerbrechlich} alt="Kitchen" height={18} width={18} />
        }
        else if (besonderheiten === "Kratzer"){
            return <img id="kratzspuren" src={Kratzer} alt="Kitchen" height={18} width={18} />
        }
    }*/

//funktion, wenn die Besonderheiten den String enthalten, dann zeige das entsprechende icon!
    function getLabeltoString(moebel) {//alle label und das einzelne als wert mitgegeben
        if(moebel.besonderheiten === "Zerbrechlich") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <img id="zerbrechlich-img" src={Zerbrechlich} alt="Kitchen" height={18} width={18} />;
        } else if (moebel.besonderheiten === "Verpackung") {
            return <img id="verpackung-img" src={Verpackung} alt="Kitchen" height={18} width={18} />
        }
        else if (moebel.besonderheiten === "Kratzer"){
            return <img id="kratzspuren" src={Kratzer} alt="Kitchen" height={18} width={18} />
        }
    }





    return (



        <div className="secondary-background">
            <Header/>
            <div className="Moebel-list-container">
                <h2> Möbel Liste </h2>
                <div className="firma-row">
                    <div className="center">
                        <RoundButton className="icon-checked">
                            <img className="firma-img" src={Livingroom} alt="Kitchen" height={18} width={19}/>
                        </RoundButton>
                        <div className="icon-label-checked">Wohnzimmer</div>
                    </div>
                    <div className="center">
                        <RoundButton>
                            <img className="firma-img" src={Kitchen} alt="Livingroom" height={18} width={18}/>
                        </RoundButton>
                        <div className="icon-label">Küche</div>
                    </div>
                    <div className="center">
                        <RoundButton>
                            <img className="firma-img" src={Bedroom} alt="Bedroom" height={18} width={18}/>
                        </RoundButton>
                        <div className="icon-label">Schlafzimmer</div>
                    </div>


                </div>
                <div className="grid">
                    {moebelData.map((moebel) => (
                        <SmallHighRoundRectangle key={moebel.id}>
                            <div className="moebel-container">
                                <div className="moebel-container-item">
                                    <div className="moebel-daten-icon">
                                        <div className="moebel-item-content">{getLabeltoString(moebel)}</div>
                                    </div>
                                    <div className="moebel-daten-title-amount">
                                        <div className="moebel-title"> Sofa ({moebel.amount})</div>
                                    </div>
                                    <div className="moebel-daten-length-width">
                                        <div className="moebel-laenge-gewicht">{moebel.length}cm, {moebel.weight}kg</div>

                                    </div>
                                </div>
                            </div>





                        </SmallHighRoundRectangle>
                    ))}
                </div>

            </div>





            <TapBarList/>


        </div>
    );
}


export default MoebelListe;
