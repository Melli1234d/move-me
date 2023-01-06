import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Profil from "./Pages/Profil/Profil";

import Moebelerkennungtest_alt from "./Pages/Moebelerkennung/Moebelerkennungtest_alt";
import Predict from "./static/Predict";
import Shop from "./Pages/Shop/Shop";
import Zeitplan from "./Pages/Zeitplan/Zeitplan";
import MoebelerkennungScannStarten from "./Pages/Moebelerkennung/MoebelerkennungScannStarten";
import MoebelListeAll from "./Pages/Moebelerkennung/MoebelListeAll";
import MoebelAngaben from "./Pages/Moebelerkennung/MoebelAngaben";
import Moebelerkennung from "./Pages/Moebelerkennung/Moebelerkennung";
import TestMoebelerkennung from "./Pages/Moebelerkennung/TestMoebelerkennung";
import MoebellistTesting from "./Pages/Moebelerkennung/MoebellistTesting";
import MoebelListe from "./Pages/Moebelerkennung/MoebelListe";





function App() {

  return (
      <div className="app-body">
          <BrowserRouter>
              <Routes>
                  <Route index element={<Home/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/profil" element={<Profil/>}/>
                  {/*<Route path="/Moebelerkennung" element={<Moebelerkennung/>}/>*/}
                  {/*<Route path="/moebelerkennungtest" element={<Moebelerkennungtest_alt/>}/>*/}
                  {/*<Route path="/predict" element={<Predict/>}/>*/}
                  <Route path="/TestMoebelerkennung" element={<TestMoebelerkennung/>}/>
                  <Route path="/shop" element={<Shop/>}/>
                  <Route path="/MoebelListe" element={<MoebelListe/>}/>
                  <Route path="/zeitplan" element={<Zeitplan/>}/>
                  <Route path="/MoebellistTesting" element={<MoebellistTesting/>}/>
                  <Route path="/Moebelangaben" element={<MoebelAngaben/>}/>
                  <Route path="/Moebelliste-alle-Moebel" element={<MoebelListeAll/>}/>
                  <Route path="/MoebelerkennungScannStarten" element={<MoebelerkennungScannStarten/>}/>
              </Routes>
          </BrowserRouter>
      </div>

  );
}

export default App;
