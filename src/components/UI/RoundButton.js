import React from 'react';

import './RoundButton.css';

const RoundButton = (props) => {
    const classes = 'round-button ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default RoundButton;
