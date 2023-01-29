import './Zeitplan.css'
import React, {useEffect, useState} from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import {collection, onSnapshot} from "firebase/firestore";
import {firestore} from "../../firebase";
import ListElement from "../../components/UI/ListElement";
import RoundButton from "../../components/UI/RoundButton";
import KalenderIcon from "../../components/Pictures/Zeitplan/calendar-event.svg";
import ListIcon from "../../components/Pictures/Zeitplan/list-ol.svg";
import Zerbrechlich from "../../components/Pictures/MoebelAngaben/zerbrechlich.png";
import Verpackung from "../../components/Pictures/MoebelAngaben/verpckung.png";
import Kratzer from "../../components/Pictures/MoebelAngaben/kratzer.png";
import Kalender from "../../components/Kalender/Kalender";
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

    //beim Button klicken wird auf Kalender ansicht gewechselt
    const handleOverview = async () => {
        setView('overview');
    }


    //beim Button klicken wird auf die Teilaufgaben geweselt
    const handleTasks = async () => {
        setView('subtasks');
    }

    function getLengthofListElement(task) {//alle label und das einzelne als wert mitgegeben
       if(task.length === 1) {
           return <ListElement key={task.id} onClick={handleTasks} className="listElement-one">
               <div className="timeplaner">
                   <p>{task.day} {task.month} {task.year}</p>
                   <h5>{task.title}</h5>
               </div>

           </ListElement>;
       } else if(task.length === 2) {
           return <ListElement key={task.id} onClick={handleTasks} className="listElement-two">
               <div className="timeplaner">
                   <p>{task.day} {task.month} {task.year}</p>
                   <h5>{task.title}</h5>
               </div>

           </ListElement>;
       }if(task.length === 3) {
            return <ListElement key={task.id} onClick={handleTasks} className="listElement-tree">
                <div className="timeplaner">
                    <p>{task.day} {task.month} {task.year}</p>
                    <h5>{task.title}</h5>
                </div>

            </ListElement>;
        } if(task.length === 4) {
            return <ListElement key={task.id} onClick={handleTasks} className="listElement-four">
                <div className="timeplaner">
                    <p>{task.day} {task.month} {task.year}</p>
                    <h5>{task.title}</h5>
                </div>

            </ListElement>;
        }
        if(task.length === 5) {
            return <ListElement onClick={handleTasks} className="listElement-five">
                <div className="timeplaner">
                    <p>{task.day} {task.month} {task.year}</p>
                    <h5>{task.title}</h5>
                </div>

            </ListElement>;
        }
    }





    return (

        <div className="secondary-background">
            <Header/>



            {view === 'overview' &&
                <>
                    <div className="title">
                        <h2> Zeitplan</h2>
                        <button onClick={handleClick} id="kalender-icon">
                            <div className="icon-calender">
                                <RoundButton id="Kalender-icon" ><img id="calendar" src={KalenderIcon} alt="Kalender Icon" height={18} width={18} /></RoundButton>
                            </div>
                        </button>
                    </div>
                    <div className="timeplan-grid">
                        {tasks.map((task) => (
                            <div key={task.id}>{getLengthofListElement(task)}</div>
                        ))}
                    </div>
                </>
            }


            {view === 'calendar' &&

                <>
                    <div className="title">
                        <h2> Zeitplan</h2>
                        <button onClick={handleOverview} id="kalender-icon">
                            <div className="icon-calender">
                                <RoundButton id="List-icon" ><img id="calendar" src={ListIcon} alt="Kalender Icon" height={18} width={18} /></RoundButton>
                            </div>
                        </button>
                    </div>
                    <Kalender/>
                    <p className="bold"> Termine: </p>
                    {appointments.map((appointment) => (
                        <ListElement className="white" key={appointment.id}>
                            <div className="timeplaner">
                                <div className="bold">{appointment.title} </div>
                                <div className="color-opacity content-row font-size-small margin-top-sm">
                                    <div className="margin-right-02">{appointment.day}.</div>
                                    <div className="margin-right-02">{appointment.month} </div>
                                    <div>{appointment.year}</div>
                                </div>
                                <div className="content-row color-white background-blue time-container">
                                    <div>{appointment.hour} : </div>
                                    <div>{appointment.minute}</div>
                                </div>
                            </div>
                        </ListElement>
                    ))}
                </>
            }



            {view === 'subtasks' &&
                <>
                    {subtasks.map((subtask) => (
                        <div key={subtask.id}>
                            <div className="timeplaner">
                                <p>{subtask.title} </p>
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
