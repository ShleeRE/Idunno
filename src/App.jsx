import "./index.css"
import LoginPage from "./Components/LoginPage/LoginPage"
import React from "react"
import { Routes, Route } from "react-router-dom"
import Homeboard from "./Components/Homeboard/Homeboard";


function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/Idunno" element={<LoginPage/>}/>
        <Route path="/Homeboard" element={<Homeboard/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
