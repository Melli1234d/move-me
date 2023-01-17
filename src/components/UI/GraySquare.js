import React from 'react';

import './GraySquare.css';
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
const GreySquare = (props) => {
    const classes = 'gray-square ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default GreySquare;
