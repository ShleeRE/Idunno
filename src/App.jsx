import "./index.css"
import LoginPage from "./Components/LoginPage/LoginPage"
import React from "react"
import { Routes, Route } from "react-router-dom"
import Homeboard from "./Components/Homeboard/Homeboard";
import AddPage from "./Components/AddPage/AddPage";
import PostPage from "./Components/PostPage/PostPage";


function App() {
  return (
    <div className="w-screen h-screen bg-orange-500">
      <Routes>
        <Route path="/Idunno" element={<LoginPage/>}/>
        <Route path="/Homeboard" element={<Homeboard/>}/>
        <Route path="/Add" element={<AddPage/>}/>
        <Route path="/Posts/:postID" element={<PostPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
