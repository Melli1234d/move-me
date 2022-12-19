import React from 'react';
import './HomeCategorieItem.css';
import BottomDividingLine from "../UI/BottomDividingLine";
import TopDividingLine from "../UI/TopDividingLine";


const HomeCategorieItem = (props) => {


    return (
        <div>
            <TopDividingLine/>
            <img src={props.picture} alt="alt"/>

           <BottomDividingLine/>
            <h2>{props.title}</h2>
            <div>{props.paragraph}</div>
            <div>{props.button}</div>

        </div>
    );
}

export default HomeCategorieItem;
