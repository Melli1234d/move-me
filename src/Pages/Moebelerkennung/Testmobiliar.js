
import React from 'react';
import {firestore} from "../../firebase";
import {useState} from "react";
import {addDoc, collection } from "firebase/firestore";
import TapBarList from "../../components/TapBar/TapBarList";

import Header from "../../components/Header/Header";
// Tutorial von: https://www.youtube.com/watch?v=PhDq-QrdIko
const Testmobiliar = (props) => {
const [amount, setAmount] = useState();
const [length, setLength] = useState();
const [weight, setWeight] = useState();

const moebelCollectionRef = collection(firestore, "moebel-data");

const handleSubmit =()=>{
        addDoc(moebelCollectionRef,{
            amount: amount,
            length: length,
            weight: weight,
        }).then(()=>{
            document.location = '/MoebelerkennungScannStarten'
        })
    }
//then gibt ne mitteilung, dass es hinzugefügt wurde und leitet dich weiter an die scan seite!!
    return (



        <div className="secondary-background">
           <h1> Möbelstück</h1>




            <form className="moebel-data">
                <label> Anzahl</label>
                <input type="text" placeholder="Enter full name"
                       onChange={(event)=>{
                           setAmount(event.target.value);
                       }}/>

                <label>Länge</label>
                <input type="text" placeholder="Enter email"
                       onChange={(event)=>{
                           setLength(event.target.value);
                       }}/>

                <label> Gewicht</label>
                <input type="text" placeholder="Enter feedback"
                       onChange={(event)=>{
                           setWeight(event.target.value);
                       }}/>
            </form>


            <button onClick={handleSubmit}> Submit</button>
            <TapBarList/>


        </div>
    );
}


export default Testmobiliar;
