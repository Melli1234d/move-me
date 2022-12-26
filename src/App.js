import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Profil from "./Pages/Profil/Profil";
import Moebelerkennung from "./Pages/Möbelerkennung/Moebelerkennung";




function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/profil" element={<Profil/>}/>
          <Route path="/moebelerkennung" element={<Moebelerkennung/>}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
