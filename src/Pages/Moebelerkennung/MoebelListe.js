import './Moebelerkennung.css'
import React, {useContext, useEffect, useState} from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import {
    onSnapshot,
    updateDoc,
    setDoc,
    deleteDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
    orderBy,
    limit,
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

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [score, setScore] = useState('');
    const [moebelData, setMoebelData] = useState([]);
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        /*const q = query(
            colletionRef,
            //  where('owner', '==', currentUserId),
            // where('title', '==', 'School1') // does not need index
            //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
            // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
            // limit(1)
        );*/

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

                {moebelData.map((moebel) => (
                    <div className="moebel" key={moebel.id}>
                        <h2>{moebel.amount}</h2>
                        <p>{moebel.besonderheiten}</p>
                        <p>{moebel.length}</p>
                        <p>{moebel.room}</p>
                        <p>{moebel.weight}</p>
                    </div>
                ))}
            </div>





            <TapBarList/>


        </div>
    );
}


export default MoebelListe;
