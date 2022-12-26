import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Profil from "./Pages/Profil/Profil";
import Moebelerkennung from "./Pages/Moebelerkennung/Moebelerkennung";
import Moebelerkennungtest from "./Pages/Moebelerkennung/Moebelerkennungtest";
import Predict from "./static/Predict";




function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/profil" element={<Profil/>}/>
          <Route path="/moebelerkennungtest" element={<Moebelerkennungtest/>}/>
            <Route path="/predict" element={<Predict/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
