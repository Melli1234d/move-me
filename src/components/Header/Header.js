import React from 'react';
import './Header.css';
import Logo from "../Pictures/Header/Logo.svg";
import Chat from "../Pictures/Header/chat-icon.png";
import Hamburger from "../Pictures/Header/Hamburger-Icon.png";
import {Link} from "react-router-dom";



//HAMBURGER MENU CODE: https://codepen.io/erikterwan/pen/EVzeRP CSS UND HTML, Links angepasst

const Header = (props) => {


    return (
        <div className="header">
            <img id="logo" src={Logo} alt="Logo" height={60} width={90} />
            <div className="header-navigation">
                <img id="chat" src={Chat} alt="Nachrichten Icon" height={25} width={25} />
                <nav role="navigation">
                    <div id="menuToggle">

                        <input type="checkbox" />
                        <img id="hamburgericon" src={Hamburger} alt="Nachrichten Icon" height={25} width={25} />
                        <ul id="menu">
                            <Link to={'/Home'}>
                                <li>Profil</li>
                            </Link>
                            <Link to={'/Home'}>
                                <li>Shop und Ausleihe</li>
                            </Link>
                            <Link to={'/Home'}>
                                <li>Tipps beim Umzug</li>
                            </Link>
                            <Link to={'/Home'}>
                                <li>Ummelden</li>
                            </Link>
                        </ul>
                    </div>
                </nav>
            </div>

        </div>
    );
}

export default Header;
