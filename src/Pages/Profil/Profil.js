import './Profil.css'
import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import {Link} from "react-router-dom";
import HomeCategories from "../../components/HomeCategories/HomeCategories";





const Profil = (props) => {
    const homecategories = [
        {
            id: 'e1',
            title: 'Toilet Paper',
            button: 'weiter',
            paragraph: 'test',
            picture: require('../../components/Pictures/BildUmzug.png'),
        },
        {
            id: 'e2',
            title: 'New TV',
            paragraph: 'test',
            button: 'weiter',
            picture: require('../../components/Pictures/BildPlanen.png'),
        },
        {
            id: 'e3',
            title: 'Car Insurance',
            paragraph: 'test',
            button: 'weiter',
            picture: require('../../components/Pictures/BildMöbel.png'),
        },
        {
            id: 'e4',
            title: 'New Desk (Wooden)',
            paragraph: 'test',
            button: 'weiter',
            picture: require('../../components/Pictures/BildCommunity.png'),
        },
    ];

    return (

        <div className="c-backbutton__container">


            <Link to={'/Profil'}>
                <div>
                    <IoIosArrowBack className="c-profilsettings__menu-icon" size={25} color="#368BFF"/>
                </div>
            </Link>


            <div>
                <HomeCategories items={homecategories} />
            </div>



        </div>
    );
}

export default Profil;
