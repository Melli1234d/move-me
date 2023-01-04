import React from 'react';

import './Square.css';
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
const Square = (props) => {
    const classes = 'square ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default Square;
