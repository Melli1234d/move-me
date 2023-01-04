import React from 'react';

import './Card.css';
//Tutorial Udemy React js von Maximilian Schwarzmüller
const Card = (props) => {
    const classes = 'card ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default Card;
