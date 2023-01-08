import './Zeitplan.css'
import React from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";



const Zeitplan = (props) => {



    return (



        <div className="secondary-background">
            <Header/>
            <div className="margin-top">
                <h2> Zeitplan</h2>
            </div>






            <TapBarList/>


        </div>
    );
}


export default Zeitplan;
