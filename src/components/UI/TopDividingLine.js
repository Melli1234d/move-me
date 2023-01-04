import React from 'react';

import './TopDividingLine.css';
//nicht mehr benutzt
const TopDividingLine = (props) => {
    const classes = 'top-dividing-line ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default TopDividingLine;
