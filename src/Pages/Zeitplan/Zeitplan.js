import './Zeitplan.css'
import React from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";



const Zeitplan = (props) => {



    return (



        <div className="secondary-background">
            <Header/>
            <h1> Zeitplan</h1>





            <TapBarList/>


        </div>
    );
}


export default Zeitplan;
