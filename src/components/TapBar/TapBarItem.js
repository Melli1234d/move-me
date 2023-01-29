import React, {useState} from 'react';
import './TapBarItem.css';

import {Link} from "react-router-dom";

//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen


//HTML wie das Icon am Ende aussehen soll
const TapBarItem = (props) => {
    const [color, setColor] = useState(false);
    const handleOnclick = ()=>{
        setColor(true);
    }
    return (
        <Link to={props.link} onClick={handleOnclick}>
            <div className="tapbar-item">
                <div className="tapbar-item-icon" style={{color:color===true?'#69D1FF':'#113352'}}>{props.icon}</div>
                <div className="tapbar-item-name" style={{color:color===true?'#69D1FF':'#113352'}}>{props.name}</div>
            </div>
        </Link>

    );
}

export default TapBarItem;
