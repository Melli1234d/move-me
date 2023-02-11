import './Firmen.css'
import React, {useEffect, useState} from 'react';

import TapBarList from "../../components/TapBar/TapBarList";
//bild: https://de.freepik.com/fotos-kostenlos/junger-kurier-und-sein-kollege-entladen-kartons-aus-lieferwagen_25630693.htm#query=umzug&position=3&from_view=search&track=sph
// XD Plugin "Auto Icon"
import Umzugsunternehmen from "../../components/Pictures/Umzugsunternehmen/unternehmen1.png"

import Header from "../../components/Header/Header";
import {collection, onSnapshot} from "firebase/firestore";
import {firestore} from "../../firebase";
import Umzug from "../../components/Pictures/Umzugsunternehmen/Umzug.png";
import Entrumpeln from "../../components/Pictures/Umzugsunternehmen/Entrümpeln.png";
import Renovieren from "../../components/Pictures/Umzugsunternehmen/Renovieren.png";
import {Link} from "react-router-dom";
import RoundButton from "../../components/UI/RoundButton";
import HighRoundRectangle from "../../components/UI/HighRoundRectangle";


const Firmen = (props) => {
    const colletionRef = collection(firestore, 'umzugsunternehmen');
    const [firma, setFirma] = useState([]);

//onSnapshot() = es wird ein Snapshot von den aktuellem Inhalt des Dokuments gemacht, ändert sich der Inhalt wird ein neuer Snapcshot gemacht & Daten werden aktualisiert
    useEffect(() => {
        const unsub = onSnapshot(colletionRef, (querySnapshot) => {
            const items = []; //definieren, dass die Items ein Array sind
            querySnapshot.forEach((doc) => { //Snapshot für jedes einzelne Dokument in der Collection
                items.push(doc.data()); //Daten werden in den Snapshot geladen
            });
            setFirma(items); //sagen, dass die aktuellen Daten die neuen Daten der Firmen sind.
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
                <h2 className="firma-h4 primary-color padding-bottom-big ">Umzugsunternehmen</h2>
                <div className="firma-row padding-bottom-big">
                    <div className="center">
                        <RoundButton className="icon-checked">
                            <img className="firma-img" src={Umzug} alt="Firma" height={18} width={19}/>
                        </RoundButton>
                        <div className="icon-label-checked">Umzug</div>
                    </div>
                    <div className="center">
                        <RoundButton>
                            <img className="firma-img" src={Entrumpeln} alt="Firma" height={18} width={18}/>
                        </RoundButton>
                        <div className="icon-label">Entrümpeln</div>
                    </div>
                    <div className="center">
                        <RoundButton>
                            <img className="firma-img" src={Renovieren} alt="Firma" height={18} width={18}/>
                        </RoundButton>
                        <div className="icon-label">Renovieren</div>
                    </div>


                </div>

                <p className="primary-color">Du kannst Dir über die nachfolgenden Firmen einen Überblick verschaffen. Schaue dir an, welche Firma für dich in Frage kommt, und schicke ihnen eine Anfrage. Dein Profil wird an die Umzugsunternehmen übergeben.</p>
                <div className="scroll-container">
                    <div className="scrollen">

                        {firma.map((firmen) => (

                            <HighRoundRectangle className="firma" key={firmen.id}>

                                <img id="firma" src={Umzugsunternehmen} alt="Firma" height={100} width={100}/>
                                <div className="firma-bewertung">{firmen.bewertung}</div>
                                <Link to="/FirmenDetail">
                                <div>
                                    <div>
                                        <div>
                                            <div className="firma-title"> {firmen.name}</div>
                                        </div>
                                        <div>
                                            <div className="firma-region">{firmen.region}</div>

                                        </div>
                                    </div>
                                </div>
                                </Link>


                            </HighRoundRectangle>

                        ))}
                    </div>
                </div>


            </div>


            <TapBarList/>


        </div>
    );
}


export default Firmen;
