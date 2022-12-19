import './Home.css'
import React, {useRef} from 'react';
import { IoIosArrowBack } from "react-icons/io";
import {Link} from "react-router-dom";
import HomeCategories from "../../components/HomeCategories/HomeCategories";
import {firestore} from "../../firebase";
import {addDoc, collection} from "@firebase/firestore";


//tutorial: https://www.youtube.com/watch?v=ad6IavyAHsQ&t=328s


const Home = (props) => {
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


    const homecategories = [
        {
            id: 'e1',
            title: 'Home',
            button: 'weiter',
            paragraph: 'test',
            picture: require('../../components/Pictures/BildUmzug.png'),
        },
        {
            id: 'e2',
            title: 'Testc2',
            paragraph: 'test',
            button: 'weiter',
            picture: require('../../components/Pictures/BildPlanen.png'),
        },
        {
            id: 'e3',
            title: 'vghfhfjzgz ',
            paragraph: 'test',
            button: 'weiter',
            picture: require('../../components/Pictures/BildMöbel.png'),
        },
        {
            id: 'e4',
            title: 'hftfutguzg',
            paragraph: 'test',
            button: 'weiter',
            picture: require('../../components/Pictures/BildCommunity.png'),
        },
    ];

    return (

        <div className="c-backbutton__container">


            <Link to={'/Profil'}>
                <div>
                    <IoIosArrowBack className="c-profilsettings__menu-icon" size={25} color="#368BFF"/>
                </div>
            </Link>
            {/*<form onSubmit={handleSave}>*/}
            {/*    <label> Enter Message</label>*/}
            {/*    <input type="text" ref={messageRef}/>*/}
            {/*    <button type="submit">Save</button>*/}
            {/*</form>*/}

            <div>
                <HomeCategories items={homecategories} />
            </div>



        </div>
    );
}


export default Home;
