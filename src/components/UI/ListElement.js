import React from 'react';

import './ListElement.css';
//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
const ListElement = (props) => {
    const classes = 'list-element ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default ListElement;
