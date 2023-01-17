import React from 'react';

import './SmallRectangle.css';
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
const SmallRectangle = (props) => {
    const classes = 'small-rectangle ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default SmallRectangle;
