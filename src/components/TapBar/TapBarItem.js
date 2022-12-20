import React from 'react';
import './TapBarItem.css';


const TapBarItem = (props) => {


    return (
        <div className="tapbar-item">
            <div className="tapbar-item-icon">{props.icon}</div>
            <div className="tapbar-item-name">{props.name}</div>
        </div>
    );
}

export default TapBarItem;
