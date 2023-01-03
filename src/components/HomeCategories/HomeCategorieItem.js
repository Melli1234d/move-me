import React from 'react';
import './HomeCategorieItem.css';
import BottomDividingLine from "../UI/BottomDividingLine";
import TopDividingLine from "../UI/TopDividingLine";


const HomeCategorieItem = (props) => {


    return (
        <div className="home-categorie-container">

            <img className="home-categorie-item-picture" src={props.picture} alt="alt"/>

            <div className={props.contentclass}>
                <h2 className="home-categorie-item-title">{props.title}</h2>
                <p className="home-categorie-item-paragraph">{props.paragraph}</p>
                <button className={props.contentclass}>{props.button}</button>
            </div>


        </div>
    );
}

export default HomeCategorieItem;
