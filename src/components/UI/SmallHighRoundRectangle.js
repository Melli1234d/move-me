import React from 'react';

import './SmallHighRoundRectangle.css';
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
const SmallHighRoundRectangle = (props) => {
    const classes = 'small-high-round-rectangle ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default SmallHighRoundRectangle;
