import './Moebelerkennung.css'
import React, { useEffect, useState} from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import {
    onSnapshot,
    collection,
    doc,
} from 'firebase/firestore';
import {firebase, firestore} from "../../firebase";
import Verpackung from "../../components/Pictures/MoebelAngaben/verpckung.png";
import Zerbrechlich from "../../components/Pictures/MoebelAngaben/zerbrechlich.png";
import Kratzer from "../../components/Pictures/MoebelAngaben/kratzer.png";
import Kitchen from "../../components/Pictures/Moebel-Angaben/Raum/kitchen.png";
import Bedroom from "../../components/Pictures/Moebel-Angaben/Raum/bedroom.png";
import Livingroom from "../../components/Pictures/Moebel-Angaben/Raum/Wohnzimmer-white.png";
import EditIcon from "../../components/Pictures/Moebelerkennung/edit.svg";
import RoundButton from "../../components/UI/RoundButton";
import SmallHighRoundRectangle from "../../components/UI/SmallHighRoundRectangle";
import { deleteDoc, updateDoc} from "@firebase/firestore";
import SmallRectangle from "../../components/UI/SmallRectangle";

//#############################################################################################################################################################
//tutorial: https://www.youtube.com/watch?v=ad6IavyAHsQ&t=328s
//tutorial: https://www.youtube.com/watch?v=3ZEz-iposj8
//link: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js
// code: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js
//https://www.youtube.com/watch?v=lW8NWB1cvMA
// XD Plugin "Auto Icon"
//############################################################################################################################################################



//Möbelliste

const MoebelListe = () => {

    const colletionRef = collection(firestore, 'moebel-data'); //Referenz zu der Collection in Firebase, wo die Möbelstücke gespeichert wurden
    const [moebelData, setMoebelData] = useState([]); //Alle Möbelstücke
    const [editbox, setEditBox] = useState(false);
    const [view, setView] = useState('list'); //edit
    const [amount, setAmount] = useState(2);// Allgemeine Anzahl der Möbelstücke, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [length, setLength] = useState(100);// Allgemeine Länge der Längsten Seite des Möbelstückes, die in Firebase gespeichert wird, gesetzt je nach Klasse
    const [weight, setWeight] = useState(50);// Allgemeines Gewicht, was in Firebase gespeichert wird, gesetzt je nach Klasse

//#############################################################################################################################################################
// LADEN DER INHALTE DER COLLECTION "MOEBEL-DATA" AUS FIREBASE
//############################################################################################################################################################

    //onSnapshot() = es wird ein Snapshot von den aktuellem Inhalt des Dokuments gemacht, ändert sich der Inhalt wird ein neuer Snapcshot gemacht & Daten werden aktualisiert
    useEffect(() => {
        const unsub = onSnapshot(colletionRef, (querySnapshot) => {
            const items = []; //definieren, dass die Items ein Array sind
            querySnapshot.forEach((doc) => { //Snapshot für jedes einzelne Dokument in der Collection
                items.push(doc.data()); //Daten werden in den Snapshot geladen
            });
            setMoebelData(items); //sagen, dass die aktuellen Daten die neuen Daten der Möbelstücke sind.
        });
        return () => {
            unsub();
        };
        // eslint-disable-next-line
    }, []);

//#############################################################################################################################################################
// FUNKTION, DIE DEN STRING FÜR BESONDERHEITEN AUS FIREBASE IN EIN ICON UMWANDELT
// ############################################################################################################################################################

    function getLabeltoIcon(moebel) {
        if (moebel.besonderheiten === "Zerbrechlich") {//wenn Besonderheiten in Firebase der String "Zerbrechlich" ist, dann gebe das Icon zu "Zerbrechlich" wieder
            return <img id="zerbrechlich-img" src={Zerbrechlich} alt="Kitchen" height={18} width={18}/>;
        } else if (moebel.besonderheiten === "Verpackung") { //wenn Besonderheiten in Firebase der String "Verpackung" ist, dann gebe das Icon zu "Verpackung" wieder
            return <img id="verpackung-img" src={Verpackung} alt="Kitchen" height={18} width={18}/>
        } else if (moebel.besonderheiten === "Kratzer") { //wenn Besonderheiten in Firebase der String "Kratzer" ist, dann gebe das Icon zu "Kratzer" wieder
            return <img id="kratzspuren" src={Kratzer} alt="Kitchen" height={18} width={18}/>
        }
    }

//#############################################################################################################################################################
// FUNKTION DIE AUS DEM LABEL ARRAY IN FIREBASE DIE HÖCHSTE WAHRSCHEINLICHKEIT HOLT
//#############################################################################################################################################################

    function getLabeltoFirebase(moebel) {
        const probabilityzero = ( moebel.label[0].probability * 100).toFixed(2); //umrechnen
        const propabilityone = (moebel.label[1].probability * 100).toFixed(2); //umrechnen
        const propabilitytwo = (moebel.label[2].probability * 100).toFixed(2); //umrechnen
        const propabilitythree = (moebel.label[3].probability * 100).toFixed(2); //umrechnen
        const propabilityfour = (moebel.label[4].probability * 100).toFixed(2); //umrechnen

        if (probabilityzero > propabilityone > propabilitytwo > propabilitythree > propabilityfour) {
                        return "Sofa";
        } else if (propabilityone > probabilityzero > propabilitytwo > propabilitythree > propabilityfour) {
                        return "Tisch";
        } else if (propabilitytwo > probabilityzero > propabilityone > propabilitythree > propabilityfour) {
                        return "Stuhl";
        } else if (propabilitythree > probabilityzero > propabilityone > propabilitytwo > propabilityfour) {
                        return "Drehstuhl";
        } else {
            return "Sitzhocker";
        }
    }


//#############################################################################################################################################################
// FUNKTION DIE DAS MÖBELSTÜCK LÖSCHT
//#############################################################################################################################################################

    async function deleteData(moebel) {

        console.log('gelöscht');
        console.log(moebel.id);
        try {
            const moebelRef = doc(colletionRef, moebel.id); //definieren des Pfades vom Dokument + id wird mit gegeben
            await deleteDoc(moebelRef, moebelRef); //er soll das Dokument löschen
        } catch (error) {
            console.error(error);
        }
    }

//#############################################################################################################################################################
// FUNKTION DIE DAS MÖBELSTÜCK BEARBEITET
//#############################################################################################################################################################

    function editData(moebel) {
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

    function handleEdit(moebel) {
        console.log(moebel);
        setEditBox(true);
        setView('edit');
    }

    return (
        <div className="secondary-background">
            <Header/>

            <div className="Moebel-list-container">
                <h2> Möbel Liste </h2>
                {view === 'list' &&
                    <>
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

                                        <img id={moebel.storedImageId} className="imgfirebase" src={moebel.storedImageId}/>

                                        <div className="moebel-container-item">
                                            <div className="moebel-daten-icon">
                                                <div className="moebel-item-content">
                                                    {getLabeltoIcon(moebel)}
                                                </div>
                                                <div onClick={() => handleEdit(moebel.id)} className="moebel-item-content">
                                                    <img id="edit-img" src={EditIcon} alt="Kitchen" height={20} width={18}/>
                                                </div>
                                            </div>

                                            <div className="moebel-daten-title-amount">
                                                <div className="moebel-title">{getLabeltoFirebase(moebel)} ({moebel.amount})
                                                </div>
                                            </div>
                                            <div className="moebel-daten-length-width">
                                                <div className="moebel-laenge-gewicht">{moebel.length}cm, {moebel.weight}kg
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </SmallHighRoundRectangle>
                            ))}

                        </div>
                    </>}

                {view === 'edit' && editbox === true &&
                    <>
                        <div className="edit-container">
                            {moebelData.map((moebel) => (
                                <div key={moebel.id}>
                                    <div className="moebel-edit">

                                        <img id={moebel.storedImageId} className="imgfirebaseedit" src={moebel.storedImageId}/>
                                        <form className="moebel-data" style={{marginTop: "1rem"}}>
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
                                        <div className="moebel-data margin-top-m">
                                            <button onClick={() => deleteData(moebel)}>Löschen</button>
                                            <button onClick={() => {
                                                editData(moebel)
                                                setEditBox(false)
                                                setView('list')
                                            }}> Aktualisieren</button>
                                        </div>

                                    </div>


                                </div>
                            ))}

                        </div>
                    </>}


            </div>


            <TapBarList/>


        </div>
    );
}


export default MoebelListe;
