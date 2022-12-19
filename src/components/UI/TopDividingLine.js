import React from 'react';

import './TopDividingLine.css';

const Card = (props) => {
    const classes = 'top-dividing-line ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default Card;
