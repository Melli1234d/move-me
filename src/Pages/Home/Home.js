import './Home.css'
import React, {useEffect, useRef, useState} from 'react';
import { IoIosArrowBack } from "react-icons/io";
import {Link} from "react-router-dom";
import HomeCategories from "../../components/HomeCategories/HomeCategories";
import {firestore} from "../../firebase";
import firebase from "firebase/app";
import {addDoc, collection} from "@firebase/firestore";
import TapBarList from "../../components/TapBar/TapBarList";
import TapBar from "../../components/TapBar/TapBar";
import HomeCategorieList from "../../components/HomeCategories/HomeCategorieList";
import KartonShoppingList from "../../components/KartonShopping/KartonShoppingList";
import Einkaufsmoeglichkeit from './../../components/Pictures/wagen2.png';
import Header from "../../components/Header/Header";
//tutorial: https://www.youtube.com/watch?v=ad6IavyAHsQ&t=328s


const Home = (props) => {
    // const [bilder, setBilder] = useState([]);
    //
    // const ref= firestore().collection("bilder");



    //  const messageRef = useRef();
    //  const ref = collection(firestore,"messages"); // wenn die collection in firebase nicht vorhanden ist, dann wird sie neu erstellt
    // //
    //  const handleSave = async(e) => {
    //        e.preventDefault(); //die seite soll nicht neu geladen werde, wenn der User auf den Button klickt
    //        console.log(messageRef.current.value);
    //
    //
    //      let data = {
    //          message: messageRef.current.value,
    //      }
    //      try {
    //          addDoc(ref,data);
    //      } catch(e) {
    //          console.log(e);
    //      }
    //
    //  };
    // const db= firebase.firestore();
    // const bilderCollection = db.collection("bilder");
    //
    // bilderCollection.doc("bilder").get().then((doc) => {
    //     console.log(doc.data().foto); //damit man auf die felder zugreifen kann
    // });


    // function getBilder() {
    //     ref.onSnapshot((querySnapshot) => {
    //         const items = []; //initialisieren des arrays
    //         querySnapshot.forEach((doc) => {
    //             items.push(doc.data());
    //         });
    //         setBilder(items);
    //     });
    // }


    // useEffect(() => {
    //     getBilder();
    // }, []);


    return (



        <div className="primary-background">
            <Header/>


            <Link to={'/Profil'}>
                <div>
                    <IoIosArrowBack className="c-profilsettings__menu-icon" size={25} color="#368BFF"/>
                </div>
            </Link>

           {/* <div>
            {bilder.map((bilder) => (
                <div key={bilder.id}>
                    <h2>{bilder.name}</h2>
                    <div>{bilder.picture}</div>
                </div>
            ))}
            </div>*/}

            {/*<form onSubmit={handleSave}>*/}
            {/*    <label> Enter Message</label>*/}
            {/*    <input type="text" ref={messageRef}/>*/}
            {/*    <button type="submit">Save</button>*/}
            {/*</form>*/}
            <div className="icon-shopping">
                <div id="einkaufswagen" ><img id="einkaufenicon" src={Einkaufsmoeglichkeit} alt="Einkaufswagen Icon" height={18} width={18} /></div>
            </div>


            <div>
                <KartonShoppingList/>
            </div>
            <div>
                <HomeCategorieList/>
            </div>

            <TapBarList/>


        </div>
    );
}


export default Home;
