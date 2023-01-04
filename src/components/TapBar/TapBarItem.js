import React from 'react';
import './TapBarItem.css';

import {Link} from "react-router-dom";

//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen


//HTML wie das Icon am Ende aussehen soll
const TapBarItem = (props) => {


    return (
        <Link to={props.link}>
            <div className="tapbar-item">
                <div className="tapbar-item-icon">{props.icon}</div>
                <div className="tapbar-item-name">{props.name}</div>
            </div>
        </Link>

    );
}

export default TapBarItem;
