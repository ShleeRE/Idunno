import React from "react";
import profile from "../../Assets/profile.png"
import messages from "../../Assets/messages.png"
import board from "../../Assets/board.png"
import SidebarItem from "./SidebarItem";


export default function HBSidebar(){
    return(
        <nav className="fixed top-2 left-0 flex flex-col">
            <SidebarItem text="Board" img={board}/>
            <SidebarItem text="Profile" img={profile}/>
            <SidebarItem text="Messages" img={messages}/>
        </nav>
    )
}