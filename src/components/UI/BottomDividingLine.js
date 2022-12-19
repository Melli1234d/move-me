import React from 'react';

import './BottomDividingLine.css';

const Card = (props) => {
    const classes = 'bottom-dividing-line ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default Card;
