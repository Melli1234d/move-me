import React from 'react';
import './HomeCategorieItem.css';
import PrimaryColoredButton from "../UI/PrimaryColoredButton";

//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen

const HomeCategorieItem = (props) => {


    return (
        <div className="home-categorie-container">

            <img className="home-categorie-item-picture" src={props.picture} alt="alt"/>

            <div className={props.contentclass}>
                <h2 className="home-categorie-item-title">{props.title}</h2>
                <p className="home-categorie-item-paragraph">{props.paragraph}</p>
                <PrimaryColoredButton className={props.contentclass}>{props.button}</PrimaryColoredButton>
            </div>


        </div>
    );
}

export default HomeCategorieItem;
