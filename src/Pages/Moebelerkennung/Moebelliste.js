import './Moebelerkennung.css'
import React  from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import Card from "../../components/UI/Card";




const Moebelliste = (props) => {


    return (



        <div className="secondary-background">
            <div className="moebelscann-container">
                <Header/>
                <h1> Möbelliste</h1>
                <Card>

                </Card>
            </div>


            <TapBarList/>


        </div>
    );
}


export default Moebelliste;
