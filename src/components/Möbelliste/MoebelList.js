import React from 'react';
import MoebelCategories from "./MoebelCategories";
import './MoebelList.css'

//Icon: Fontawesome
//Bild 1:https://de.freepik.com/fotos-kostenlos/junges-paar-zog-in-ein-neues-haus-oder-eine-neue-wohnung-spass-mit-pappkartons-haben-nach-dem-reinigen-und-auspacken-am-umzugstag-entspannen_12701225.htm#query=umzug&position=45&from_view=search&track=sph
const MoebelList = (props) => {
    const moebelcategories = [
        {
            id: 'e1',
            title: 'Sofa',
            picture: require('../Pictures/BildUmzug.png'),
            menge: 1,
            length: 200,
            weight: 20,
            zerbrechlich: require('../Pictures/MoebelAngaben/zerbrechlich.png'),
            verpackung: require('../Pictures/MoebelAngaben/verpckung.png'),
        },
        {
            id: 'e2',
            title: 'Tisch',
            picture: require('../Pictures/BildUmzug.png'),
            menge: 1,
            length: 200,
            weight: 20,
            zerbrechlich: require('../Pictures/MoebelAngaben/zerbrechlich.png'),
            verpackung: require('../Pictures/MoebelAngaben/verpckung.png'),
        },

    ];

    return (
        <div>
            <MoebelCategories items={moebelcategories} />
        </div>
    );
}

export default MoebelList;
