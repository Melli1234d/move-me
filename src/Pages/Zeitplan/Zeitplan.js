import './Zeitplan.css'
import React, {useEffect, useState} from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import {collection, onSnapshot} from "firebase/firestore";
import {firestore} from "../../firebase";
import ListElement from "../../components/UI/ListElement";
import RoundButton from "../../components/UI/RoundButton";
import Einkaufsmoeglichkeit from "../../components/Pictures/wagen2.png";
import Kalender from "../../components/Pictures/Zeitplan/calendar-event.svg";

//code: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js


const Zeitplan = (props) => {
    const colletionRef = collection(firestore, 'Aufgabenpakete');
    const timeplanRef = collection(firestore, 'Teilaufgaben');
    const appointmentRef = collection(firestore, 'Termine');
    const [tasks, setTasks] = useState([]);
    const [subtasks, setSubTasks] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [view, setView] = useState('overview'); // 'calendar', 'subtasks'


/*    ZEITPLAN ÜBERSICHT "OVERVIEW"*/

    useEffect(() => {
        // const unsub = onSnapshot(q, (querySnapshot) => {
        const unsub = onSnapshot(colletionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setTasks(items);
        });
        return () => {
            unsub();

        };

        // eslint-disable-next-line
    }, []);



    /* TEILAUFGABEN ANSICHT "SUBTASKS" */

    useEffect(() => {
        // const unsub = onSnapshot(q, (querySnapshot) => {
        const unsub = onSnapshot(timeplanRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setSubTasks(items);
        });
        return () => {
            unsub();

        };

        // eslint-disable-next-line
    }, []);





   /* KALENDERANSICHT MIT DEN BEREITS FESTGELEGTEN TERMINEN "CALENDAR" */

    useEffect(() => {
        // const unsub = onSnapshot(q, (querySnapshot) => {
        const unsub = onSnapshot(appointmentRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setAppointments(items);
        });
        return () => {
            unsub();

        };

        // eslint-disable-next-line
    }, []);








    //beim Button klicken wird auf Kalender ansicht gewechselt
    const handleClick = async () => {
        setView('calendar');
    }

    //beim Button klicken wird auf die Teilaufgaben geweselt
    const handleTasks = async () => {
        setView('subtasks');
    }







    return (

        <div className="secondary-background">
            <Header/>
            <div className="title">
                <h2> Zeitplan</h2>
                <button onClick={handleClick} id="kalender-icon">
                    <div className="icon-calender">
                        <RoundButton id="Kalender-icon" ><img id="calendar" src={Kalender} alt="Kalender Icon" height={18} width={18} /></RoundButton>
                    </div>
                </button>

            </div>



            {view === 'overview' &&
                <>
                    <div className="timeplan-grid">
                        {tasks.map((task) => (
                            <ListElement key={task.id} onClick={handleTasks}>
                                <div className="timeplaner">
                                    <p>{task.day} {task.month} {task.year}</p>
                                    <h5>{task.title}</h5>
                                </div>

                            </ListElement>
                        ))}
                    </div>
                </>
            }


            {view === 'calendar' &&

                <>
                    {subtasks.map((subtask) => (
                        <ListElement key={subtask.id}>
                            <div className="timeplaner">
                                <p>{subtask.title} </p>
                            </div>

                        </ListElement>
                    ))}
                </>
            }



            {view === 'subtasks' &&
                <>
                    {appointments.map((appointment) => (
                        <div key={appointment.id}>
                            <div className="timeplaner">
                                <p>{appointment.title} </p>
                            </div>

                        </div>
                    ))}
                </>
            }






            <TapBarList/>


        </div>
    );
}


export default Zeitplan;
