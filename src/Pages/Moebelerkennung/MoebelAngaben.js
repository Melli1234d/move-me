
import React, {useEffect, useRef, useState} from 'react';

import {firestore} from "../../firebase";
import {addDoc, collection} from "@firebase/firestore";
import TapBarList from "../../components/TapBar/TapBarList";

import Header from "../../components/Header/Header";
import Kitchen from "../../components/Pictures/Moebel-Angaben/Raum/kitchen.png";
import Bedroom from "../../components/Pictures/Moebel-Angaben/Raum/bedroom.png";
import Livingroom from "../../components/Pictures/Moebel-Angaben/Raum/livingroom.png";

// Tutorial von: https://www.youtube.com/watch?v=PhDq-QrdIko




//Bildschirm um die Details festzulegen, nachdem das Foto gemacht wurde

const MoebelAngaben = (props) => {

    const [amount, setAmount] = useState();
    const [length, setLength] = useState();
    const [weight, setWeight] = useState();
    const [room, setRoom] = useState();
    const [besonderheiten, setBesonderheiten] = useState();

    //der Pfad für die Sammlung in Firebase, falls noch nciht vorhanden wird es angelegt
    const moebelCollectionRef = collection(firestore, "moebel-data");

    //beim Klick auf den Button werden sie Sachen an Firebase geschickt
    const handleSubmit =()=>{
        addDoc(moebelCollectionRef,{
            amount: amount,
            length: length,
            weight: weight,
            room: room,
            besonderheiten: besonderheiten,
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
                        <input type="text" placeholder="Anzahl..."
                               onChange={(event)=>{
                                   setAmount(event.target.value);
                               }}/>
                    </div>
                    <div className="moebel-data-item">
                        <label>Länge</label>
                        <input type="text" placeholder="Länge.."
                               onChange={(event)=>{
                                   setLength(event.target.value);
                               }}/>
                    </div>

                    <div className="moebel-data-item">
                        <label> Gewicht</label>
                        <input type="text" placeholder="Gewicht.."
                               onChange={(event)=>{
                                   setWeight(event.target.value);
                               }}/>
                    </div>


                </form>
                <form className="moebel-data-full-width">
                    <fieldset>
                        <h5 className="h5-moebel-data"> Raumauswahl</h5>
                    <div className="moebel-specials-item">
                        <input type="radio" id="kitchen"value="Küche" name="Raum"
                               onChange={(event)=>{
                                   setRoom(event.target.value);
                               }}/>
                        <label  className="label-special-data" htmlFor="kitchen">
                            <div className="picture-div">
                                <img id="küche" src={Kitchen} alt="Kitchen" height={18} width={18} />
                            </div>
                            <p className="label-input">Küche</p>
                        </label>




                        <input type="radio" id="bedroom"value="Schlafzimmer" name="Raum"
                               onChange={(event)=>{
                                   setRoom(event.target.value);
                               }}/>
                        <label className="label-special-data" htmlFor="bedroom">
                            <div className="picture-div">
                                <img id="schlafzimmer" src={Bedroom} alt="Schlafzimmer" height={18} width={18} />
                            </div>
                            <p className="label-input">Schlafzimmer</p>
                        </label>

                        <input type="radio" id="livingroom"value="Wohnzimmer" name="Raum"
                               onChange={(event)=>{
                                   setRoom(event.target.value);
                               }}/>
                        <label className="label-special-data" htmlFor="livingroom">
                            <div className="picture-div">
                                <img id="wohnzimmer" src={Livingroom} alt="Wohnzimmer" height={18} width={18} />
                            </div>
                            <p className="label-input">Wohnzimmer</p>
                        </label>

                    </div>
                    </fieldset>

                </form>


                <form className="moebel-data-full-width">
                    <fieldset>
                        <h5 className="h5-moebel-data"> Besonderheiten</h5>
                    <div className="moebel-specials-item">
                        <input type="radio" id="verpackung"value="Verpackung" name="Besonderheiten"
                               onChange={(event)=>{
                                   setBesonderheiten(event.target.value);
                               }}/>
                        <label className="label-special-data" htmlFor="verpackung">
                            <div className="picture-div">
                                <img id="küche" src={Kitchen} alt="Kitchen" height={18} width={18} />
                            </div>
                            <p className="label-input">Verpackung</p>
                        </label>

                        <input type="radio" id="zerbrechlich"value="Zerbrechlich" name="Besonderheiten"
                               onChange={(event)=>{
                                   setBesonderheiten(event.target.value);
                               }}/>
                        <label className="label-special-data" htmlFor="zerbrechlich">
                            <div className="picture-div">
                                <img id="küche" src={Kitchen} alt="Kitchen" height={18} width={18} />
                            </div>
                            <p className="label-input">Zerbrechlich</p>
                            </label>

                        <input type="radio" id="kratzer"value="Kratzer" name="Besonderheiten"
                               onChange={(event)=>{
                                   setBesonderheiten(event.target.value);
                               }}/>
                        <label className="label-special-data" htmlFor="kratzer">
                            <div className="picture-div">
                                <img id="küche" src={Kitchen} alt="Kitchen" height={18} width={18} />
                            </div>
                            <p className="label-input">Kratzer</p>
                            </label>

                    </div>
                    </fieldset>

                </form>

                <button className="right" onClick={handleSubmit}> Hinzufügen</button>
            </div>




            <TapBarList/>


        </div>
    );
}


export default MoebelAngaben;
