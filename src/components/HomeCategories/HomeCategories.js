import React from 'react';
import './HomeCategories.css';
import HomeCategorieItem from "./HomeCategorieItem";


const HomeCategories = (props) => {


    return (
        <div className="homecategories">

            <HomeCategorieItem
                title={props.items[0].title}
                paragraph={props.items[0].paragraph}
                button={props.items[0].button}
                picture={props.items[0].picture}
            />
            <HomeCategorieItem
                title={props.items[1].title}
                paragraph={props.items[1].paragraph}
                button={props.items[1].button}
                picture={props.items[1].picture}
            />
            <HomeCategorieItem
                title={props.items[2].title}
                paragraph={props.items[2].paragraph}
                button={props.items[2].button}
                picture={props.items[2].picture}
            />
            <HomeCategorieItem
                title={props.items[3].title}
                paragraph={props.items[3].paragraph}
                button={props.items[3].button}
                picture={props.items[3].picture}
            />
        </div>
    );
}

export default HomeCategories;
