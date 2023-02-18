import React from "react";

export default function SidebarItem(props){
    return(
        <section className="flex flex-row gap-1 mx-1">
            <img src={props.img} alt={`${props.text}`} className="w-7 xs:w-8 pointer-events-auto" onClick={props.handleClick}/>
            <p className="hidden text-white tablet:inline-block self-center text-xxs font-normal laptop:text-xs">{props.text}</p>
        </section>
    )
}