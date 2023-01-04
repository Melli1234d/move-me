
import React, {useEffect, useRef, useState} from 'react';

import {firestore} from "../../firebase";
import {addDoc, collection} from "@firebase/firestore";
import TapBarList from "../../components/TapBar/TapBarList";

import Header from "../../components/Header/Header";
import Moebelerkennung from "../../components/Pictures/Moebelerkennung/Couchbild.png";

// Tutorial von: https://www.youtube.com/watch?v=PhDq-QrdIko




//Bildschirm um die Details festzulegen

const MoebelAngaben = (props) => {

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
            <Header/>
            <div className="moebel-data-container">
                <h1> Möbelstück</h1>




                <form className="moebel-data">
                    <div className="moebel-data-item">
                        <label> Anzahl</label>
                        <input type="text" placeholder="Enter full name"
                               onChange={(event)=>{
                                   setAmount(event.target.value);
                               }}/>
                    </div>
                    <div className="moebel-data-item">
                        <label>Länge</label>
                        <input type="text" placeholder="Enter email"
                               onChange={(event)=>{
                                   setLength(event.target.value);
                               }}/>
                    </div>

                    <div className="moebel-data-item">
                        <label> Gewicht</label>
                        <input type="text" placeholder="Enter feedback"
                               onChange={(event)=>{
                                   setWeight(event.target.value);
                               }}/>
                    </div>


                </form>


                <button onClick={handleSubmit}> Submit</button>
            </div>




            <TapBarList/>


        </div>
    );
}


export default MoebelAngaben;
