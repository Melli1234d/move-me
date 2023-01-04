import './Moebelerkennung.css'
import React  from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import Card from "../../components/UI/Card";
import Moebelerkennung from "../../components/Pictures/Moebelerkennung/Couchbild.png";
import {Link} from "react-router-dom";

//Start Bildschirm wenn man das erste mal auf "Erkennen" drückt
const MoebelerkennungScannStarten = (props) => {


    return (



        <div className="secondary-background">
            <div className="moebelscann-container">
                <Header/>
                <h1> Möbelerfassung</h1>
                <Card>
                    {/*Das Bild ist von: https://de.freepik.com/fotos-kostenlos/skandinavischer-wohnzimmer-innenarchitektur-zoom-hintergrund_18835794.htm#page=2&query=couch&position=0&from_view=search&track=sph*/}
                    <img id="Möbelerkennung" src={Moebelerkennung} alt="Möbelerkennung Standardbild" height={150} width={200} />
                    <p>
                        Scannen Sie Ihr Mobiliar ein,  was Sie beim Umzug mitnehmen wollen.
                        Bitte achten Sie darauf, dass das Möbelstück gut zu erkennen ist.
                    </p>
                    <Link to="/Moebelangaben">
                        <button id="primary-button"> Scannen </button>
                    </Link>
                </Card>
            </div>


            <TapBarList/>


        </div>
    );
}


export default MoebelerkennungScannStarten;
