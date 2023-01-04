import React from 'react';

import './PrimaryColoredButton.css';
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
const PrimaryColoredButton = (props) => {
    const classes = 'primary-colored-button ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default PrimaryColoredButton;
