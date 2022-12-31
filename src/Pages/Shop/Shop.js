import './Shop.css'
import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import {Link} from "react-router-dom";
import TapBarList from "../../components/TapBar/TapBarList";
import KartonShoppingList from "../../components/KartonShopping/KartonShoppingList";
import Einkaufsmoeglichkeit from './../../components/Pictures/wagen2.png';
import Header from "../../components/Header/Header";



const Home = (props) => {



    return (



        <div className="secondary-background">
            <Header/>


            <Link to={'/Home'}>
                <div>
                    <IoIosArrowBack className="c-profilsettings__menu-icon" size={25} color="#368BFF"/>
                </div>
            </Link>


            <div className="icon-shopping">
                <div id="einkaufswagen" ><img id="einkaufenicon" src={Einkaufsmoeglichkeit} alt="Einkaufswagen Icon" height={18} width={18} /></div>
            </div>


            <div>
                <KartonShoppingList/>
            </div>



            <TapBarList/>


        </div>
    );
}


export default Home;
