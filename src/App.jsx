import "./index.css"
import LoginPage from "./Components/LoginPage/LoginPage"
import React from "react"
import { Routes, Route } from "react-router-dom"
import Homeboard from "./Components/Homeboard/Homeboard";
import AddPage from "./Components/AddPage/AddPage";


function App() {
  return (
    <div className="w-screen h-screen bg-orange-500">
      <Routes>
        <Route path="/Idunno" element={<LoginPage/>}/>
        <Route path="/Homeboard" element={<Homeboard/>}/>
        <Route path="/Add" element={<AddPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
