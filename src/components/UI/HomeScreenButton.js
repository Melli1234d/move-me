import React from 'react';

import './HomeScreenButton.css';
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
const HomeScreenButton = (props) => {
    const classes = 'home-screen-button ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default HomeScreenButton;
