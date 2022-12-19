import React from 'react';

import './HomeScreenButton.css';

const HomeScreenButton = (props) => {
    const classes = 'home-screen-button ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default HomeScreenButton;
