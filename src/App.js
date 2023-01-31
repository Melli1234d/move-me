import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Zeitplan from "./Pages/Zeitplan/Zeitplan";
import TestMoebelerkennung from "./Pages/Moebelerkennung/TestMoebelerkennung";
import MoebelListe from "./Pages/Moebelerkennung/MoebelListe";
import Firmen from "./Pages/Firmen/Firmen";
import FirmenDetail from "./Pages/Firmen/FirmenDetail";


function App() {

  return (
      <div className="app-body">
          <BrowserRouter>
              <Routes>
                  <Route index element={<Home/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/TestMoebelerkennung" element={<TestMoebelerkennung/>}/>
                  <Route path="/Firmen" element={<Firmen/>}/>
                  <Route path="/FirmenDetail" element={<FirmenDetail/>}/>
                  <Route path="/MoebelListe" element={<MoebelListe/>}/>
                  <Route path="/zeitplan" element={<Zeitplan/>}/>
              </Routes>
          </BrowserRouter>
      </div>

  );
}

export default App;
