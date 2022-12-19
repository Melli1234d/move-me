import React from 'react';

import './TopCard.css';

const TopCard = (props) => {
    const classes = 'top-card ' + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default TopCard;
