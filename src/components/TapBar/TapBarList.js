import React, {useState} from 'react';
import './TapBarList.css';
import TapBar from "./TapBar";
import HomeIcon from "../Pictures/Tabbar/home.svg";
import HomeIconActive from "../Pictures/Tabbar/homeactive.svg";
import ErkennungIcon from "../Pictures/Tabbar/erkennung.svg";
import ErkennungIconActive from "../Pictures/Tabbar/erkennungactive.svg";
import MoebellisteIcon from "../Pictures/Tabbar/moebelliste.svg";
import MoebellisteIconActive from "../Pictures/Tabbar/Moebellisteactive.svg";
import ZeitplanIcon from "../Pictures/Tabbar/plan.svg";
import ZeitplanIconActive from "../Pictures/Tabbar/zeitplanactive.svg";
import FiremenIcon from "../Pictures/Tabbar/firmen.svg";
import FiremenIconActive from "../Pictures/Tabbar/firmenactive.svg";

//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen


//Liste mit dem Inhalt der Items in einem Array
const TapBarList = (props) => {

    const tapbar = [
        {
            id: 'e1',
            active: <img className="content-center eyecatcher" src={HomeIconActive} alt="Nachrichten Icon" height={80} width={80} />,
            icon: <img className="content-center" src={HomeIcon} alt="Nachrichten Icon" height={25} width={25} />,
            name: 'Home',
            link: '/Home',
        },
        {
            id: 'e2',
            active: <img className="content-center eyecatcher" src={ErkennungIconActive} alt="Nachrichten Icon" height={80} width={80} />,
            icon: <img className="content-center" src={ErkennungIcon} alt="Nachrichten Icon" height={25} width={25} />,
            name: 'Erkennung',
            link: '/TestMoebelerkennung',
        },
        {
            id: 'e3',
            active: <img className="content-center eyecatcher" src={MoebellisteIconActive} alt="Nachrichten Icon" height={80} width={80} />,
            icon: <img className="content-center" src={MoebellisteIcon} alt="Nachrichten Icon" height={25} width={25} />,
            name: 'Möbelliste',
            link: '/Moebelliste',

        },
        {
            id: 'e4',
            active: <img className="content-center eyecatcher" src={ZeitplanIconActive} alt="Nachrichten Icon" height={80} width={80} />,
            icon: <img className="content-center" src={ZeitplanIcon} alt="Nachrichten Icon" height={25} width={25} />,
            name: 'Zeitplan',
            link: '/Zeitplan',
        },
        {
            id: 'e5',
            active: <img className="content-center eyecatcher" src={FiremenIconActive} alt="Nachrichten Icon" height={80} width={80} />,
            icon:  <img className="content-center" src={FiremenIcon} alt="Nachrichten Icon" height={25} width={25} />,
            name: 'Firmen',
            link: '/firmen',
        },
    ];

    return (
        <ul className="tapbar-list">
            <li>
                <TapBar items={tapbar}/>
            </li>
        </ul>
    );
}

export default TapBarList;
