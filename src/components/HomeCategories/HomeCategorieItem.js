import React from 'react';
import './HomeCategorieItem.css';
import BottomDividingLine from "../UI/BottomDividingLine";
import TopDividingLine from "../UI/TopDividingLine";


const HomeCategorieItem = (props) => {


    return (
        <div>

            <img className="home-categorie-item-picture" src={props.picture} alt="alt"/>


            <h2 className="home-categorie-item-title">{props.title}</h2>
            <div className="home-categorie-item-paragraph">{props.paragraph}</div>
            <div className="home-categorie-item-button">{props.button}</div>

        </div>
    );
}

export default HomeCategorieItem;
