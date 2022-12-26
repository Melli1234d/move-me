import React from 'react';
import './TapBarList.css';
import { BiHome  } from "react-icons/bi";
import TapBar from "./TapBar";
import {TbArmchair2, TbTruckDelivery, TbCalendarTime} from "react-icons/tb";
import {GrList} from "react-icons/gr";




const TapBarList = (props) => {
    const tapbar = [
        {
            id: 'e1',
            icon: <BiHome size={25} />,
            name: 'Home',
            link: '/Home',
        },
        {
            id: 'e2',
            icon: <TbArmchair2 size={25}/>,
            name: 'Erkennung',
            link: '/Profil',
        },
        {
            id: 'e3',
            icon: <GrList size={25}/>,
            name: 'Möbelliste',
            link: '/Profil',

        },
        {
            id: 'e4',
            icon: <TbCalendarTime size={25}/>,
            name: 'Zeitplan',
            link: '/Home',
        },
        {
            id: 'e5',
            icon:  <TbTruckDelivery size={25}/>,
            name: 'Firmen',
            link: '/Home',
        },
    ];

    return (
        <ul className="tapbar-list">
            <li>
                <TapBar items={tapbar} />
            </li>

        </ul>
    );
}

export default TapBarList;