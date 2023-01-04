import React from 'react';
import './KartonShoppingList.css';
import KartonShopping from "./KartonShopping";

//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen

const KartonShoppingList = (props) => {
    const kartons = [
        {
            id: 'e1',
            title: 'Pappkarton',
            button: 'weiter',
            paragraph: 'test',
            picture: require('../Pictures/BildUmzug.png'),
        },
        {
            id: 'e2',
            title: 'Plastikkiste',
            paragraph: 'test',
            button: 'weiter',
            picture: require('../Pictures/BildPlanen.png'),
        },
        {
            id: 'e3',
            title: 'Holzkiste',
            paragraph: 'test',
            button: 'weiter',
            picture: require('../Pictures/BildMöbel.png'),
        },

    ];

    return (
        <div>
            <KartonShopping items={kartons} />
        </div>
    );
}

export default KartonShoppingList;
