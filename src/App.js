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
import Shop from "./Pages/Shop/Shop";
import Zeitplan from "./Pages/Zeitplan/Zeitplan";
import MoebelerkennungScannStarten from "./Pages/Moebelerkennung/MoebelerkennungScannStarten";
import Moebelliste from "./Pages/Moebelerkennung/Moebelliste";




function App() {

  return (
      <div className="app-body">
          <BrowserRouter>
              <Routes>
                  <Route index element={<Home/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/profil" element={<Profil/>}/>
                  <Route path="/moebelerkennungtest" element={<Moebelerkennungtest/>}/>
                  <Route path="/predict" element={<Predict/>}/>
                  <Route path="/shop" element={<Shop/>}/>
                  <Route path="/zeitplan" element={<Zeitplan/>}/>
                  <Route path="/Moebelliste" element={<Moebelliste/>}/>
                  <Route path="/MoebelerkennungScannStarten" element={<MoebelerkennungScannStarten/>}/>
              </Routes>
          </BrowserRouter>
      </div>

  );
}

export default App;
