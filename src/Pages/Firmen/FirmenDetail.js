import './Firmen.css'
import React, {useEffect, useState} from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import Umzugsunternehmen from "../../components/Pictures/Umzugsunternehmen/unternehmen1.png";
import ProfilbildBewertung from "../../components/Pictures/Umzugsunternehmen/profilbild-bewertung.svg";
import Backarrow from "../../components/Pictures/arrow-left.svg";
import {Link} from "react-router-dom";
import PrimaryColoredButton from "../../components/UI/PrimaryColoredButton";
import GraySquare from "../../components/UI/GraySquare";
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
                    <GraySquare className="graueBox">
                        <div className="number">
                            140
                        </div>
                        <div className="kriterium">
                            Aufträge
                        </div>
                    </GraySquare>
                    <GraySquare className="graueBox">
                        <div className="number">
                            170
                        </div>
                        <div className="kriterium">
                            Rezensionen
                        </div>
                    </GraySquare>
                    <GraySquare className="graueBox">
                        <div className="number">
                            4
                        </div>
                        <div className="kriterium">
                            Bewertungen
                        </div>
                    </GraySquare>
                </div>
                <p> Wir von Umzugsfred sind eine kompetente Umzugsfirma in der Berliner Region, die sich auf Privatumzüge konzentriert. Seit den 1980 Jahren haben wir ein Familienbetrieb. Die Zufriedenheit der Kunden ist uns sehr wichtig. Wir bieten die Möglichkeit von Schwertransporten.</p>
                <h5 className="h5-firma"> Kostenvoranschlag</h5>
                <p>Hole dir einen kostenlosen Kostenvoranschlag von uns! Wir generieren den Preis anhand deiner Daten im Profil. Bitte achte darauf, dass die Möbelliste so gut wie fertig ist. Änderungen sind später dennoch möglich.</p>
                <PrimaryColoredButton> Anfragen</PrimaryColoredButton>

                <div className="biggreybox-bewertungen">
                    <div className="bewertung-nutzer">
                        <img id="firma-bewerung" src={ProfilbildBewertung} alt="Firma" />
                        <div className="name"> Martin Reck </div>
                    </div>
                    <p>
                        Sehr nette Mitarbeiter! Der Umzug lief reibungslos ab. Es gab keine Komplikationen. Ich bin sehr zufrieden, gerne nächstes Mal wieder!
                    </p>

                </div>



            </div>








            <TapBarList/>


        </div>
    );
}


export default FirmenDetail;
