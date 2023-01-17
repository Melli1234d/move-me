import React from 'react';

import './BigRectangle.css';
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
const BigRectangle = (props) => {
    const classes = 'big-rectangle ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default BigRectangle;
