import React from 'react';

import './Square.css';

const Square = (props) => {
    const classes = 'square ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default Square;
