import './Firmen.css'
import React, {useEffect, useState} from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import Umzugsunternehmen from "../../components/Pictures/Umzugsunternehmen/unternehmen1.png";
import Rezensionen from "../../components/Pictures/Rezensionen.png"
import Backarrow from "../../components/Pictures/backarrow.png";
import {Link} from "react-router-dom";
//bild: https://de.freepik.com/fotos-kostenlos/junger-kurier-und-sein-kollege-entladen-kartons-aus-lieferwagen_25630693.htm#query=umzug&position=3&from_view=search&track=sph

const FirmenDetail = (props) => {


    return (



        <div className="secondary-background">
            <Header/>
            <div className="firma-container">
                <div className="row-content">
                    <Link to="/Firmen">
                        <img id="backarrow" src={Backarrow} alt="Firma" />
                    </Link>

                    <h4> Umzugsunternehmen</h4>
                </div>

                <div className="secondary-background">
                    <img id="firma-big" src={Umzugsunternehmen} alt="Firma" />
                </div>


                <div className="container-row">
                    <div className="graueBox">
                        <div className="number">
                            140
                        </div>
                        <div className="kriterium">
                            Aufträge
                        </div>
                    </div>
                    <div className="graueBox">
                        <div className="number">
                            170
                        </div>
                        <div className="kriterium">
                            Rezensionen
                        </div>
                    </div>
                    <div className="graueBox">
                        <div className="number">
                            4
                        </div>
                        <div className="kriterium">
                            Bewertungen
                        </div>
                        {/*<img id="rezensionen-trucks" src={Rezensionen} alt="Rezensionen" />*/}
                    </div>
                </div>
                <p> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</p>
                <h5 className="h5-firma"> Kostenvoranschlag</h5>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</p>
                <button> Anfragen</button>

                <div className="biggreybox-bewertungen">
                    <div className="bewertung-nutzer">
                        <div> Profilbild</div>
                        <div className="name"> Max Mustermann</div>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua
                    </p>

                </div>



            </div>








            <TapBarList/>


        </div>
    );
}


export default FirmenDetail;
