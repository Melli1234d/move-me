import './Firmen.css'
import React, {useEffect, useState} from 'react';

import TapBarList from "../../components/TapBar/TapBarList";
//bild: https://de.freepik.com/fotos-kostenlos/junger-kurier-und-sein-kollege-entladen-kartons-aus-lieferwagen_25630693.htm#query=umzug&position=3&from_view=search&track=sph
import Umzugsunternehmen from "../../components/Pictures/Umzugsunternehmen/unternehmen1.png"

import Header from "../../components/Header/Header";
import {collection, onSnapshot} from "firebase/firestore";
import {firestore} from "../../firebase";
import Umzug from "../../components/Pictures/Umzugsunternehmen/Umzug.png";
import Entrumpeln from "../../components/Pictures/Umzugsunternehmen/Entrümpeln.png";
import Renovieren from "../../components/Pictures/Umzugsunternehmen/Renovieren.png";
import {Link} from "react-router-dom";


const Firmen = (props) => {
    const colletionRef = collection(firestore, 'umzugsunternehmen');
    const [firma, setFirma] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        console.log(firma);
        setLoading(true);
        // const unsub = onSnapshot(q, (querySnapshot) => {
        const unsub = onSnapshot(colletionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setFirma(items);
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
                <h2> Firmen </h2>
                <div className="firma-row">
                    <div className="center">
                        <div className="icon-checked">
                            <img className="firma-img" src={Umzug} alt="Firma" height={18} width={19}/>
                        </div>
                        <div className="icon-label-checked">Umzug</div>
                    </div>
                    <div className="center">
                        <div className="icon-unchecked">
                            <img className="firma-img" src={Entrumpeln} alt="Firma" height={18} width={18}/>
                        </div>
                        <div className="icon-label">Entrümpeln</div>
                    </div>
                    <div className="center">
                        <div className="icon-unchecked">
                            <img className="firma-img" src={Renovieren} alt="Firma" height={18} width={18}/>
                        </div>
                        <div className="icon-label">Renovieren</div>
                    </div>


                </div>
                <h4 className="firma-h4">Umzugsunternehmen</h4>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua Lorem ipsum dolor sit amet, consetetur
                    sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                    sed diam voluptua</p>
                <div className="scroll-container">
                    <div className="scrollen">

                        {firma.map((firmen) => (

                            <div className="firma" key={firmen.id}>

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


                            </div>

                        ))}
                    </div>
                </div>


            </div>


            <TapBarList/>


        </div>
    );
}


export default Firmen;
