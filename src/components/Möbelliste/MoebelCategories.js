import React from 'react';
import './Moebelcategories.css'
import MoebellistItem from "./MoebellistItem";


const MoebelCategories = (props) => {


    return (
        <div className="moebelcategories">

            <MoebellistItem
                title={props.items[0].title}
                menge={props.items[0].menge}
                length={props.items[0].length}
                zerbrechlich={props.items[0].zerbrechlich}
                verpackung={props.items[0].verpackung}
                picture={props.items[0].picture}
                weight={props.items[0].weight}
            />
            <MoebellistItem
                title={props.items[1].title}
                menge={props.items[1].menge}
                length={props.items[1].length}
                zerbrechlich={props.items[1].zerbrechlich}
                verpackung={props.items[1].verpackung}
                picture={props.items[1].picture}
                weight={props.items[1].weight}
            />

        </div>
    );
}

export default MoebelCategories;
