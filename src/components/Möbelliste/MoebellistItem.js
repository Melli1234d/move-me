import './MoebellistItem.css'
import React  from 'react';


import Square from "../UI/Square";
import Card from "../UI/Card";




const MoebellistItem = (props) => {


    return (





            <div className="moebelitem">
                <div>
                    <img className="home-categorie-item-picture" src={props.picture} alt="alt"/>
                    <div className="besonderheiten">
                        <img className="verpackung" src={props.verpackung} alt="alt"/>
                        <img className="zerbrechlich" src={props.zerbrechlich} alt="alt"/>
                    </div>
                    <h5 className="h5-moebelitem">{props.title} ({props.menge})</h5>
                    <div className="moebeldetails">
                        <div>{props.length}cm, {props.weight}kg</div>
                    </div>
                </div>








        </div>
    );
}


export default MoebellistItem;
