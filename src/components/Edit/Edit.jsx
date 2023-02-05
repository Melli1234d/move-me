import React, {useState} from 'react';

import SmallRectangle from "../UI/SmallRectangle";
import {addDoc, getDocs, getFirestore, updateDoc} from "@firebase/firestore";
import {firestore} from "../../firebase";
import * as db from '@firebase/firestore'
import firebase, {collection} from "firebase/firestore";
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen

const Edit = ({moebel, setEditBox}) => {
    const [amount, setAmount] = useState(2);// Allgemeine Anzahl der Möbelstücke, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [length, setLength] = useState(100);// Allgemeine Länge der Längsten Seite des Möbelstückes, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [weight, setWeight] = useState(50);// Allgemeines Gewicht, was in Firebase gespeichert wird, gesetzt je nach Klasse
    const colletionRef = collection(firestore, 'moebel-data'); //Referenz zu der Collection in Firebase, wo die Möbelstücke gespeichert wurden



    /*function editDoc(updatedDoc) {
        colletionRefUpdate.doc(updatedDoc.id).update(updatedDoc)
    }*/

    function editDocTest() {

        /*updateDoc(colletionRef,{
            amount: amount,
            length: length,
            weight: weight,
        })*/
        db.collection(colletionRef).doc(moebel.id).update({
            weight: weight,
            length: length,
            amount: amount,
        })
        /*db.collection(colletionRef).doc(moebel.id).update({
            weight: weight,
            length: length,
            amount: amount,
        })*/
       /*db.collection('moebel-date').doc('ICTKVCWDXCWqosotCOxv').update({
           weight: weight,
           length: length,
           amount: amount,
           })*/
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
                editDocTest()
                /*editDoc({weight: weight, length: length, amount: amount, id: moebel.id})*/
                setEditBox(false)
            }}>update</button>
        </div>
    );
};

export default Edit;
