import './Zeitplan.css'
import { v4 as uuid } from 'uuid';
import React, {useEffect, useState} from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import {collection, onSnapshot, addDoc } from "firebase/firestore";
import {firestore} from "../../firebase";
import ListElement from "../../components/UI/ListElement";
import RoundButton from "../../components/UI/RoundButton";
import KalenderIcon from "../../components/Pictures/Zeitplan/calendar-event.svg";
import KalenderPlus from "../../components/Pictures/Zeitplan/calendar-plus.svg";
import ListIcon from "../../components/Pictures/Zeitplan/list-ol.svg";
import Zerbrechlich from "../../components/Pictures/MoebelAngaben/zerbrechlich.png";
import Verpackung from "../../components/Pictures/MoebelAngaben/verpckung.png";
import Kratzer from "../../components/Pictures/MoebelAngaben/kratzer.png";
import Kalender from "../../components/Kalender/Kalender";
import {Link} from "react-router-dom";
import ArrowLeft from "../../components/Pictures/arrow-left.svg";
import GraySquare from "../../components/UI/GraySquare";
import Kitchen from "../../components/Pictures/Moebel-Angaben/Raum/kitchen.png";
import Bedroom from "../../components/Pictures/Moebel-Angaben/Raum/bedroom.png";
import Livingroom from "../../components/Pictures/Moebel-Angaben/Raum/livingroom.png";
import BigRectangle from "../../components/UI/BigRectangle";
import {getDoc, updateDoc} from "@firebase/firestore";
import * as db from "@firebase/firestore";
import { doc} from "firebase/firestore";
//code: https://github.com/samfromaway/firebase-tutorial/blob/master/src/SnapshotFirebaseAdvanced.js


const Zeitplan = (props) => {
    const colletionRef = collection(firestore, 'Aufgabenpakete');
    const timeplanRef = collection(firestore, 'Teilaufgaben');
    const appointmentRef = collection(firestore, 'Termine');
    const [tasks, setTasks] = useState([]);
    const [subtasks, setSubTasks] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [view, setView] = useState('overview'); // 'calendar', 'subtasks' //addAppointment
    const [date, setDate] = useState(false);
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [month, setMonth] = useState();
    const [day, setDay] = useState();
    const [hour, setHour] = useState();
    const [minute, setMinute] = useState();
    const [year, setYear] = useState();

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

    //beim Button klicken wird auf die Zeitplan Übersicht ansicht gewechselt
    const handleOverview = async () => {
        setView('overview');
    }


    //beim Button klicken wird auf die Teilaufgaben geweselt
    const handleTasks = async () => {
        setView('subtasks');
    }


    const unique_id = uuid();
    //Screen der die Terinauswahl anzeigt
    const handleAddAppointment = async () => {
        setView('addAppointment');
    }

    //Termin hinzufügen Button
    const handleAddDate = async () => {
        addDoc(appointmentRef, {
            id:id,
            title: title,
            day: day,
            month: month,
            hour: hour,
            minute: minute,
            year: year,
        })
        setView('calendar');
    }

//bei Teilaufgaben Screen wenn kein Datum gesetzt eige Kalender Icon, wenn Datum gesetzt, zeige Datum
    function getDateorIcon(subtask) {
        if(date === false){
            return <img src={KalenderPlus} alt="Kalender Icon" height={30} width={30} />;
        } else {
            return <div className="content-column">
                <div>
                    <div>{subtask.day}</div>
                    <div>{subtask.month}</div>
                </div>
                <div className="content-row color-opacity">
                    <div>{subtask.starthour}: </div>
                    <div>{subtask.startminute}- </div>
                    <div>{subtask.endhour}: </div>
                    <div>{subtask.endminute}</div>
                </div>
            </div>
        }
    }

    //Bei Zeitplan Übersicht, die Länge des Containers ausgeben, da sie immer unterschiedlich sein kann
    function getLengthofListElement(task) {//alle label und das einzelne als wert mitgegeben
       if(task.length === 1) {
           return <ListElement key={task.id}  className="listElement-one">
               <div className="timeplaner">
                   <p>{task.day} {task.month} {task.year}</p>
                   <h5>{task.title}</h5>
               </div>

           </ListElement>;
       } else if(task.length === 2) {
           return <ListElement key={task.id} className="listElement-two">
               <div className="timeplaner">
                   <p>{task.day} {task.month} {task.year}</p>
                   <h5>{task.title}</h5>
               </div>

           </ListElement>;
       }if(task.length === 3) {
            return <ListElement key={task.id} className="listElement-tree">
                <div className="timeplaner">
                    <p>{task.day} {task.month} {task.year}</p>
                    <h5>{task.title}</h5>
                </div>

            </ListElement>;
        } if(task.length === 4) {
            return <ListElement key={task.id} className="listElement-four">
                <div className="timeplaner">
                    <p>{task.day} {task.month} {task.year}</p>
                    <h5>{task.title}</h5>
                </div>

            </ListElement>;
        }
        if(task.length === 5) {
            return <ListElement className="listElement-five">
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
                            <div key={task.id} onClick={handleTasks}>{getLengthofListElement(task)}</div>
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
                    <div className="margin-bottom-m">
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
                    </div>
                </>
            }



            {view === 'subtasks' &&
                <>
                    <div className="title">
                        <div onClick={handleOverview}  className="leftarrow">
                                <img src={ArrowLeft} alt="Kalender Icon" height={18} width={18}/>
                        </div>
                        <h2> Teilaufgaben </h2>

                    </div>
                    {subtasks.map((subtask) => (
                        <ListElement className="white" key={subtask.id}>
                            <div className="subtask-container">
                                <div className="content-column">
                                    <p className="bold margin-top-sm margin-bottom-sm padding-left-xs">{subtask.title} </p>
                                    <p className="color-opacity margin-top-sm margin-bottom-sm padding-left-xs">{subtask.paragraph}</p>
                                </div>
                                <div  id="calendaradd" onClick={handleAddAppointment}>{getDateorIcon(subtask)} </div>

                            </div>

                        </ListElement>
                    ))}
                </>
            }
            {view === 'addAppointment' &&
                <>
                    <div className="title">
                        <div onClick={handleOverview}  className="leftarrow">
                            <img src={ArrowLeft} alt="Kalender Icon" height={18} width={18}/>
                        </div>
                        <h2> Terminplanung </h2>

                    </div>


                    <div className="container-row">
                        <GraySquare className="graueBox">
                            <div className="number">
                                Packen
                            </div>
                            <div className="kriterium">
                                Tätigkeit
                            </div>
                        </GraySquare>
                        <GraySquare className="graueBox">
                            <div className="number">
                                Umzug
                            </div>
                            <div className="kriterium">
                                Kalender
                            </div>
                        </GraySquare>
                        <GraySquare className="graueBox">
                            <div className="number">
                                4
                            </div>
                            <div className="kriterium">
                                Dauer
                            </div>
                            {/*<img id="rezensionen-trucks" src={Rezensionen} alt="Rezensionen" />*/}
                        </GraySquare>
                    </div>
                    <p> Terminvorschläge</p>
                    <div>

                        <div className="content-column">
                            <div className="container-row">
                                <input type="radio" id="nineteenaug"value="17:00" name="Zeit"
                                       onChange={(event)=>{
                                           setDate(true);
                                           setId(unique_id);
                                           setTitle("Karton packen");
                                           setDay(19);
                                           setMonth("März");
                                           setHour("17");
                                           setMinute("00");
                                           setYear("2023");
                                       }}/>
                                <label  className="label-appointment-data" htmlFor="nineteenaug">
                                    <ListElement className="whitebackground">
                                        <div className="subtask-container">
                                            <div className="content-column">
                                                <p className="bold margin-top-sm margin-bottom-sm padding-left-xs">19 </p>
                                                <p className="color-opacity margin-top-sm margin-bottom-sm padding-left-xs">März</p>
                                            </div>
                                            <div className="content-row color-white background-blue timestamp">
                                                <div>17:00 </div>
                                            </div>

                                        </div>

                                    </ListElement>
                                </label>
                            </div>

                            <div className="container-row">
                                <input type="radio" id="twentyaug"value="17:00" name="Zeit"
                                       onChange={(event)=>{
                                           setDate(true);
                                           setId(unique_id);
                                           setTitle("Karton packen");
                                           setDay(20);
                                           setMonth("März");
                                           setHour("17");
                                           setMinute("00");
                                           setYear("2023");
                                       }}/>
                                <label  className="label-appointment-data" htmlFor="twentyaug">
                                    <ListElement className="whitebackground">
                                        <div className="subtask-container">
                                            <div className="content-column">
                                                <p className="bold margin-top-sm margin-bottom-sm padding-left-xs">20 </p>
                                                <p className="color-opacity margin-top-sm margin-bottom-sm padding-left-xs">März</p>
                                            </div>
                                            <div className="content-row color-white background-blue timestamp">
                                                <div>17:00 </div>
                                            </div>

                                        </div>

                                    </ListElement>
                                </label>
                            </div>

                            <div className="container-row">
                                <input type="radio" id="twentyoneaug"value="17:00" name="Zeit"
                                       onChange={(event)=>{
                                           setDate(true);
                                           setId(unique_id);
                                           setTitle("Karton packen");
                                           setDay(21);
                                           setMonth("März");
                                           setHour("17");
                                           setMinute("00");
                                           setYear("2023");
                                       }}/>
                                <label  className="label-appointment-data" htmlFor="twentyoneaug">
                                    <ListElement className="whitebackground">
                                        <div className="subtask-container">
                                            <div className="content-column">
                                                <p className="bold margin-top-sm margin-bottom-sm padding-left-xs">21 </p>
                                                <p className="color-opacity margin-top-sm margin-bottom-sm padding-left-xs">März</p>
                                            </div>
                                            <div className="content-row color-white background-blue timestamp">
                                                <div>17:00 </div>
                                            </div>

                                        </div>

                                    </ListElement>
                                </label>
                            </div>

                            <div className="container-row">
                                <input type="radio" id="twentytwoaug"value="17:00" name="Zeit"
                                       onChange={(event)=>{
                                           setDate(true);
                                           setId(unique_id);
                                           setTitle("Karton packen");
                                           setDay(22);
                                           setMonth("März");
                                           setHour("17");
                                           setMinute("00");
                                           setYear("2023");
                                       }}/>
                                <label  className="label-appointment-data" htmlFor="twentytwoaug">
                                    <ListElement className="whitebackground">
                                        <div className="subtask-container">
                                            <div className="content-column">
                                                <p className="bold margin-top-sm margin-bottom-sm padding-left-xs">22 </p>
                                                <p className="color-opacity margin-top-sm margin-bottom-sm padding-left-xs">März</p>
                                            </div>
                                            <div className="content-row color-white background-blue timestamp">
                                                <div>17:00 </div>
                                            </div>

                                        </div>

                                    </ListElement>
                                </label>
                            </div>

                        </div>
                    <button onClick={handleAddDate} className="right margin-bottom-m margin-top-m"> Temrin hinzufügen</button>
                    </div>

                </>
            }






            <TapBarList/>


        </div>
    );
}


export default Zeitplan;
