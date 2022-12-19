import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Profil from "./Pages/Profil/Profil";




function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/profil" element={<Profil/>}/>
          <Route path="/home" element={<Home/>}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
