import './Moebelerkennung.css'
import React, {useContext, useEffect, useState} from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import {
    doc,
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


//Möbelliste

const MoebellistTesting = (props) => {


    const colletionRef = collection(firestore, 'schools');

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [score, setScore] = useState('');
    const [schools, setSchools] = useState([]);
const [loading, setLoading] = useState(false);

const ref = collection(firestore, "schools");



    useEffect(() => {
        const q = query(
            colletionRef,
            //  where('owner', '==', currentUserId),
            where('title', '==', 'School1') // does not need index
            //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
            // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
            // limit(1)
        );

        setLoading(true);
        // const unsub = onSnapshot(q, (querySnapshot) => {
        const unsub = onSnapshot(colletionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setSchools(items);
            setLoading(false);
        });
        return () => {
            unsub();
        };

        // eslint-disable-next-line
    }, []);








    return (



        <div className="secondary-background">
            <h2> Möbel Liste Testen sachen aus Firebase </h2>


            <h1> Schools</h1>
            {schools.map((school) => (
                <div className="school" key={school.id}>
                    <h2>{school.title}</h2>
                    <p>{school.desc}</p>
                    <p>{school.score}</p>
                </div>
            ))}

            <TapBarList/>


        </div>
    );
}


export default MoebellistTesting;
