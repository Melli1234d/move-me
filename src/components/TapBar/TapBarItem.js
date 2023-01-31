import React, {useState} from 'react';
import './TapBarItem.css';

import {Link} from "react-router-dom";

//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen


//HTML wie das Icon am Ende aussehen soll
const TapBarItem = (props) => {
    const [step, setStep] = useState("inactive");
    const [color, setColor] = useState(false);
    const handleOnclick = ()=>{
        setStep("active");
        setColor(true);
    }
    return (

<div>
            {step === 'inactive' &&
                <>
                    <div onClick={handleOnclick}>
                    <Link to={props.link}>
                        <div className="tapbar-item" >
                            <div className="tapbar-item-icon" style={{color:color===true?'#69D1FF':'#113352'}}>{props.icon}</div>
                            <div className="tapbar-item-name" style={{color:color===true?'#69D1FF':'#113352'}}>{props.name}</div>
                        </div>
                    </Link>
            </div>
                </>
            }
            {step === 'active' &&
                <>
                        <div className="tapbar-item active" >
                            <div className="tapbar-item-icon active" >{props.active}</div>
                            <div className="tapbar-item-name active" >{props.name}</div>
                        </div>
                </>
            }
</div>



    );
}

export default TapBarItem;
