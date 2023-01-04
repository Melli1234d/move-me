import React from 'react';

import './RoundButton.css';
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
const RoundButton = (props) => {
    const classes = 'round-button ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default RoundButton;
