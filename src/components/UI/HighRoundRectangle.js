import React from 'react';

import './HighRoundRectangle.css';
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
const HighRoundRectangle = (props) => {
    const classes = 'high-round-rectangle ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default HighRoundRectangle;
