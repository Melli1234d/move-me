import React, {useState} from 'react';

import SmallRectangle from "../UI/SmallRectangle";
import {addDoc, getDocs, getFirestore, updateDoc, deleteDoc} from "@firebase/firestore";
import {firestore} from "../../firebase";
import * as db from '@firebase/firestore'
import firebase, {collection} from "firebase/firestore";
import {doc} from "@firebase/firestore";
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen


//code: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js

const Edit = ({moebel, setEditBox}) => {
    const [amount, setAmount] = useState(2);// Allgemeine Anzahl der Möbelstücke, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [length, setLength] = useState(100);// Allgemeine Länge der Längsten Seite des Möbelstückes, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [weight, setWeight] = useState(50);// Allgemeines Gewicht, was in Firebase gespeichert wird, gesetzt je nach Klasse
    const colletionRef = collection(firestore, 'moebel-data'); //Referenz zu der Collection in Firebase, wo die Möbelstücke gespeichert wurden


    async function deleteSchool(moebel) {
        try {
            const moebelRef = doc(colletionRef, moebel.id);
            await deleteDoc(moebelRef, moebelRef);
        } catch (error) {
            console.error(error);
        }
    }
    async function editData(moebel) {
        const updatedMoebel = {
            amount: amount,
            length: length,
            weight: weight,
        };

        try {
            const moebelRef = doc(colletionRef, moebel.id);
            updateDoc(moebelRef, updatedMoebel);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form   key={moebel.id} style={{
                marginTop: "1rem",
            }}>
                <SmallRectangle>
                    <label> Anzahl</label>
                    <input type="text" placeholder={moebel.amount}
                           onChange={(event)=>{
                               setAmount(event.target.value);
                           }}/>
                </SmallRectangle>
                <SmallRectangle>
                    <label>Länge</label>
                    <input type="text" placeholder={moebel.length}
                           onChange={(event)=>{
                               setLength(event.target.value);
                           }}/>
                </SmallRectangle >

                <SmallRectangle>
                    <label> Gewicht</label>
                    <input type="text" placeholder={moebel.weight}
                           onChange={(event)=>{
                               setWeight(event.target.value);
                           }}/>
                </SmallRectangle >
            </form>
            <button onClick={() => {
                editData()
                setEditBox(false)
            }}>update</button>
        </div>
    );
};

export default Edit;
