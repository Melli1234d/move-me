import React from 'react';
import './TapBar.css';
import TapBarItem from "./TapBarItem";

//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen



//Darstellung der 5 Icons in der Tabbar
const TapbBar = (props) => {


    return (
        <div className="tapbar">

            <TapBarItem
                icon={props.items[0].icon}
                name={props.items[0].name}
                active={props.items[0].active}
                link={props.items[0].link}
            />
            <TapBarItem
                icon={props.items[1].icon}
                active={props.items[1].active}
                name={props.items[1].name}
                link={props.items[1].link}
            />
            <TapBarItem
                icon={props.items[2].icon}
                active={props.items[2].active}
                name={props.items[2].name}
                link={props.items[2].link}
            />
            <TapBarItem
                icon={props.items[3].icon}
                active={props.items[3].active}
                name={props.items[3].name}
                link={props.items[3].link}
            />
            <TapBarItem
                icon={props.items[4].icon}
                active={props.items[4].active}
                name={props.items[4].name}
                link={props.items[4].link}
            />
        </div>
    );
}

export default TapbBar;
