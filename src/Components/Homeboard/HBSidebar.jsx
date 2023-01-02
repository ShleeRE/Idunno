import React from "react";
import profile from "../../Assets/profile.png"
import messages from "../../Assets/messages.png"
import board from "../../Assets/board.png"
import plus from "../../Assets/plus.png"
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";


export default function HBSidebar(){

    const navigate = useNavigate()

    function handleAdd(){
        navigate("/Add")
    }

    return(
        <nav className="fixed top-2 left-0 flex flex-col">
            <SidebarItem text="Board" img={board}/>
            <SidebarItem text="Profile" img={profile}/>
            <SidebarItem text="Messages" img={messages}/>
            <SidebarItem text="Add new" img={plus} handleClick={handleAdd}/>
        </nav>
    )
}