import React from 'react';
import './Header.css';
import Logo from "../Pictures/Header/movemelogo.png";
import Chat from "../Pictures/Header/chat-icon.png";
import Menu from "../Pictures/Header/Hamburger-Icon.png";
import {IoIosArrowBack} from "react-icons/io";
import {Link} from "react-router-dom";



//HAMBURGER MENU CODE: https://codepen.io/erikterwan/pen/EVzeRP

const Header = (props) => {


    return (
        <div className="header">
            <img id="logo" src={Logo} alt="Logo" height={30} width={80} />
            <div className="header-navigation">
                <img id="chat" src={Chat} alt="Nachrichten Icon" height={18} width={18} />
                <nav role="navigation">
                    <div id="menuToggle">

                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul id="menu">
                            <Link to={'/Profil'}>
                                <li>Profil</li>
                            </Link>
                            <Link to={'/Shop'}>
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
