import './Moebelerkennung.css'
import React, {useContext, useEffect, useState} from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import {
    onSnapshot,
    collection,
} from 'firebase/firestore';
import {firebase, firestore} from "../../firebase";

import Verpackung from "../../components/Pictures/MoebelAngaben/verpckung.png";
import Zerbrechlich from "../../components/Pictures/MoebelAngaben/zerbrechlich.png";
import Kratzer from "../../components/Pictures/MoebelAngaben/kratzer.png";

import Kitchen from "../../components/Pictures/Moebel-Angaben/Raum/kitchen.png";
import Bedroom from "../../components/Pictures/Moebel-Angaben/Raum/bedroom.png";
import Livingroom from "../../components/Pictures/Moebel-Angaben/Raum/Wohnzimmer-white.png";
import RoundButton from "../../components/UI/RoundButton";
import SmallHighRoundRectangle from "../../components/UI/SmallHighRoundRectangle";
import {getDownloadURL, getStorage, listAll, ref} from "firebase/storage";


//tutorial: https://www.youtube.com/watch?v=ad6IavyAHsQ&t=328s
//tutorial: https://www.youtube.com/watch?v=3ZEz-iposj8
//link: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js
// code: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js

//Möbelliste

const MoebelListe = (besonderheiten) => {

    const [storedImageId, setStoredImageId] = useState();
    const colletionRef = collection(firestore, 'moebel-data');
    const [moebelData, setMoebelData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const storage = getStorage();
    const imageRef = ref(storage, "images/");

    useEffect(() => {
        listAll(imageRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrl(url);
                });
            });
        });
    }, []);


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


//funktion, wenn die Besonderheiten den String enthalten, dann zeige das entsprechende icon!
    function getLabeltoIcon(moebel) {//alle label und das einzelne als wert mitgegeben
        if (moebel.besonderheiten === "Zerbrechlich") {
            //wenn label ist das höchste dann return label + wahrscheinlichkeit
            return <img id="zerbrechlich-img" src={Zerbrechlich} alt="Kitchen" height={18} width={18}/>;
        } else if (moebel.besonderheiten === "Verpackung") {
            return <img id="verpackung-img" src={Verpackung} alt="Kitchen" height={18} width={18}/>
        } else if (moebel.besonderheiten === "Kratzer") {
            return <img id="kratzspuren" src={Kratzer} alt="Kitchen" height={18} width={18}/>
        }
    }

    //funktion die aus dem Array die höchste Wahrscheinlichkeit raus holt, umgerechnet mal 100 und mit 2 nach komma stellen
    function getLabeltoFirebase(moebel) {
        if ((moebel.label[0].probability*100).toFixed(2) > (moebel.label[1].probability*100).toFixed(2)) {
            if ((moebel.label[0].probability*100).toFixed(2) > (moebel.label[2].probability*100).toFixed(2)) {
                if ((moebel.label[0].probability*100).toFixed(2) > (moebel.label[3].probability*100).toFixed(2)) {
                    if ((moebel.label[0].probability*100).toFixed(2) > (moebel.label[4].probability*100).toFixed(2)) {
                        return "Sofa";
                    }
                }
            }
        } else if ((moebel.label[1].probability*100).toFixed(2) > (moebel.label[0].probability*100).toFixed(2)) {
            if ((moebel.label[1].probability*100).toFixed(2) > (moebel.label[2].probability*100).toFixed(2)) {
                if ((moebel.label[1].probability*100).toFixed(2) > (moebel.label[3].probability*100).toFixed(2)) {
                    if ((moebel.label[1].probability*100).toFixed(2) > (moebel.label[4].probability*100).toFixed(2)) {
                        return "Drehstuhl";
                    }
                }
            }
        } else if ((moebel.label[2].probability*100).toFixed(2) > (moebel.label[0].probability*100).toFixed(2)) {
            if ((moebel.label[2].probability*100).toFixed(2) > (moebel.label[1].probability*100).toFixed(2)) {
                if ((moebel.label[2].probability*100).toFixed(2) > (moebel.label[3].probability*100).toFixed(2)) {
                    if ((moebel.label[2].probability*100).toFixed(2) > (moebel.label[4].probability*100).toFixed(2)) {
                        return "Sitzhocker";
                    }
                }
            }
        } else if ((moebel.label[3].probability*100).toFixed(2) > (moebel.label[0].probability*100).toFixed(2)) {
            if ((moebel.label[3].probability*100).toFixed(2) > (moebel.label[1].probability*100).toFixed(2)) {
                if ((moebel.label[3].probability*100).toFixed(2) > (moebel.label[2].probability*100).toFixed(2)) {
                    if ((moebel.label[3].probability*100).toFixed(2) > (moebel.label[4].probability*100).toFixed(2)) {
                        return "Stuhl";
                    }
                }
            }
        } else if ((moebel.label[4].probability*100).toFixed(2) > (moebel.label[0].probability*100).toFixed(2)) {
            if ((moebel.label[4].probability*100).toFixed(2) > (moebel.label[1].probability*100).toFixed(2)) {
                if ((moebel.label[4].probability*100).toFixed(2) > (moebel.label[2].probability*100).toFixed(2)) {
                    if ((moebel.label[4].probability*100).toFixed(2) > (moebel.label[3].probability*100).toFixed(2)) {
                        return "Tisch";
                    }
                }
            }
        }

    }


    return (


        <div className="secondary-background">
            <Header/>
            <div className="Moebel-list-container">
                <h2> Möbel Liste </h2>
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
                                        <div className="moebel-item-content">{getLabeltoIcon(moebel)}</div>
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

            </div>


            <TapBarList/>


        </div>
    );
}


export default MoebelListe;
