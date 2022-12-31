import React from 'react';
import './KartonShopping.css';
import KartonShoppingItem from "./KartonShoppingItem";


const KartonShopping = (props) => {


    return (
        <div className="homecategories">

            <KartonShoppingItem
                title={props.items[0].title}
                paragraph={props.items[0].paragraph}
                button={props.items[0].button}
                picture={props.items[0].picture}
            />
            <KartonShoppingItem
                title={props.items[1].title}
                paragraph={props.items[1].paragraph}
                button={props.items[1].button}
                picture={props.items[1].picture}
            />
            <KartonShoppingItem
                title={props.items[2].title}
                paragraph={props.items[2].paragraph}
                button={props.items[2].button}
                picture={props.items[2].picture}
            />

        </div>
    );
}

export default KartonShopping;
