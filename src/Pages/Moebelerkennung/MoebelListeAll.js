import './Moebelerkennung.css'
import React from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";

import MoebelList from "../../components/Möbelliste/MoebelList";
import Card from "../../components/UI/Card";
//tutorial: https://www.youtube.com/watch?v=ad6IavyAHsQ&t=328s

//Möbelliste

const MoebelListeAll = (props) => {


    return (



        <div className="secondary-background">
            <Header/>
            <div className="moebelscann-container">
                <h2> Möbelliste</h2>
                <div className="moebelliste">
                    <MoebelList/>
                </div>
            </div>








            <TapBarList/>


        </div>
    );
}


export default MoebelListeAll;
