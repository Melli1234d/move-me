import React from 'react';

import './BottomDividingLine.css';

const BottomDividingLine = (props) => {
    const classes = 'bottom-dividing-line ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default BottomDividingLine;
