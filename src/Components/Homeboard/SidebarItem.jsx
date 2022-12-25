import React from "react";

export default function SidebarItem(props){
    return(
        <section className="flex flex-row gap-1 w-10 mx-1">
            <img src={props.img} alt={`${props.text}`}/>
            <p className="hidden tablet:inline-block self-center text-xxs font-medium laptop:text-xs">{props.text}</p>
        </section>
    )
}