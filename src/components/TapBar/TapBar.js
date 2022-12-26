import React from 'react';
import './TapBar.css';
import TapBarItem from "./TapBarItem";


const TapbBar = (props) => {


    return (
        <div className="tapbar">

            <TapBarItem
                icon={props.items[0].icon}
                name={props.items[0].name}
                link={props.items[0].link}
            />
            <TapBarItem
                icon={props.items[1].icon}
                name={props.items[1].name}
                link={props.items[1].link}
            />
            <TapBarItem
                icon={props.items[2].icon}
                name={props.items[2].name}
                link={props.items[2].link}
            />
            <TapBarItem
                icon={props.items[3].icon}
                name={props.items[3].name}
                link={props.items[3].link}
            />
            <TapBarItem
                icon={props.items[4].icon}
                name={props.items[4].name}
                link={props.items[4].link}
            />
        </div>
    );
}

export default TapbBar;
