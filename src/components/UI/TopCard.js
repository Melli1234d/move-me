import React from 'react';

import './TopCard.css';
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
const TopCard = (props) => {
    const classes = 'top-card ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default TopCard;
