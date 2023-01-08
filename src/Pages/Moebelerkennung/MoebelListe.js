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





    return (



        <div className="secondary-background">
            <Header/>
            <div className="Moebel-list-container">
                <h2> Möbel Liste </h2>
                <div className="firma-row">
                    <div className="center">
                        <div className="icon-checked">
                            <img className="firma-img" src={Livingroom} alt="Kitchen" height={18} width={19}/>
                        </div>
                        <div className="icon-label-checked">Wohnzimmer</div>
                    </div>
                    <div className="center">
                        <div className="icon-unchecked">
                            <img className="firma-img" src={Kitchen} alt="Livingroom" height={18} width={18}/>
                        </div>
                        <div className="icon-label">Küche</div>
                    </div>
                    <div className="center">
                        <div className="icon-unchecked">
                            <img className="firma-img" src={Bedroom} alt="Bedroom" height={18} width={18}/>
                        </div>
                        <div className="icon-label">Schlafzimmer</div>
                    </div>


                </div>
                <div className="grid">
                    {moebelData.map((moebel) => (
                        <div className="moebel" key={moebel.id}>
                            <div className="moebel-container">
                                <div className="moebel-container-item">
                                    <div className="moebel-daten-icon">
                                        <div className="moebel-item-content">{moebel.besonderheiten}</div>
                                        {/*<div className="moebel-item-content">{moebel.room}</div>*/}
                                    </div>
                                    <div className="moebel-daten-title-amount">
                                        <div className="moebel-title"> Sofa ({moebel.amount})</div>
                                    </div>
                                    <div className="moebel-daten-length-width">
                                        <div className="moebel-laenge-gewicht">{moebel.length}cm, {moebel.weight}kg</div>

                                    </div>
                                </div>
                            </div>





                        </div>
                    ))}
                </div>

            </div>





            <TapBarList/>


        </div>
    );
}


export default MoebelListe;
