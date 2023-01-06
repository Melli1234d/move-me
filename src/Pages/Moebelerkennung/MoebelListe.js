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
//tutorial: https://www.youtube.com/watch?v=ad6IavyAHsQ&t=328s
//tutorial: https://www.youtube.com/watch?v=3ZEz-iposj8
//link: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js
// code: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js

//Möbelliste

const MoebelListe = (props) => {


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








    return (



        <div className="secondary-background">
            <Header/>
            <div className="Moebel-list-container">
                <h2> Möbel Liste </h2>
                <div className="grid">
                    {moebelData.map((moebel) => (
                        <div className="moebel" key={moebel.id}>
                            <div className="moebel-container">
                                <div className="moebel-container-item">
                                    <div className="moebel-daten-icon">
                                        <div className="moebel-item-content">{moebel.besonderheiten}</div>
                                        <div className="moebel-item-content">{moebel.room}</div>
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
