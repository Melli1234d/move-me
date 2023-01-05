import './Moebelerkennung.css'
import React, {useEffect, useState} from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";

import {firebase} from "../../firebase";

import MoebellistItem from "../../components/Möbelliste/MoebellistItem";
//tutorial: https://www.youtube.com/watch?v=ad6IavyAHsQ&t=328s
//tutorial: https://www.youtube.com/watch?v=3ZEz-iposj8
//link: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js


//Möbelliste

const MoebellistTesting = (props) => {

    return (



        <div className="secondary-background">
            <Header/>


            <TapBarList/>


        </div>
    );
}


export default MoebellistTesting;
