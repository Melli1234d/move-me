import React from 'react';
import './HomeCategorieList.css';

import HomeCategories from "./HomeCategories";



const HomeCategorieList = (props) => {
    const homecategories = [
        {
            id: 'e1',
            title: 'Home',
            button: 'weiter',
            paragraph: 'test',
            picture: require('../Pictures/BildUmzug.png'),
        },
        {
            id: 'e2',
            title: 'Testc2',
            paragraph: 'test',
            button: 'weiter',
            picture: require('../Pictures/BildPlanen.png'),
        },
        {
            id: 'e3',
            title: 'vghfhfjzgz ',
            paragraph: 'test',
            button: 'weiter',
            picture: require('../Pictures/BildMöbel.png'),
        },
        {
            id: 'e4',
            title: 'hftfutguzg',
            paragraph: 'test',
            button: 'weiter',
            picture: require('../Pictures/BildCommunity.png'),
        },
    ];

    return (
        <div>
            <HomeCategories items={homecategories} />
        </div>
    );
}

export default HomeCategorieList;
