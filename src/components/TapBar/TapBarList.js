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
        },
        {
            id: 'e2',
            icon: <TbArmchair2 size={25}/>,
            name: 'Erkennung',
        },
        {
            id: 'e3',
            icon: <GrList size={25}/>,
            name: 'Möbelliste',

        },
        {
            id: 'e4',
            icon: <TbCalendarTime size={25}/>,
            name: 'Zeitplan',
        },
        {
            id: 'e5',
            icon:  <TbTruckDelivery size={25}/>,
            name: 'Firmen',
        },
    ];

    return (
        <div className="tapbar-list">
            <TapBar items={tapbar} />
        </div>
    );
}

export default TapBarList;
