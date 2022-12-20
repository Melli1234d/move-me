import React from 'react';
import './TapBar.css';
import TapBarItem from "./TapBarItem";


const TapbBar = (props) => {


    return (
        <div className="tapbar">

            <TapBarItem
                icon={props.items[0].icon}
                name={props.items[0].name}
            />
            <TapBarItem
                icon={props.items[1].icon}
                name={props.items[1].name}
            />
            <TapBarItem
                icon={props.items[2].icon}
                name={props.items[2].name}
            />
            <TapBarItem
                icon={props.items[3].icon}
                name={props.items[3].name}
            />
            <TapBarItem
                icon={props.items[4].icon}
                name={props.items[4].name}
            />
        </div>
    );
}

export default TapbBar;
