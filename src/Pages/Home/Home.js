import './Home.css'
import React from 'react';
import TapBarList from "../../components/TapBar/TapBarList";
import HomeCategorieList from "../../components/HomeCategories/HomeCategorieList";
import Header from "../../components/Header/Header";



const Home = (props) => {
    return (
        <div className="primary-background">
            <Header/>
            <div>
                <HomeCategorieList/>
            </div>
            <TapBarList/>
        </div>
    );
}


export default Home;
