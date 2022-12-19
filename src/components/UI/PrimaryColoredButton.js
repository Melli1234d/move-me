import React from 'react';

import './PrimaryColoredButton.css';

const PrimaryColoredButton = (props) => {
    const classes = 'primary-colored-button ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default PrimaryColoredButton;
