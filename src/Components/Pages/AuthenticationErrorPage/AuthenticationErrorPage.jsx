import authImg from "Assets/auth.png"
import * as Popups from "Components/Popups/Popups"
import { useNavigate } from "react-router-dom";
import React from "react";

export default function AuthenticationErrorPage(){
    const nav = useNavigate()
    const [popupsObj, setPopupsObj] = React.useState(()=> Popups.popupsObject)

    const delayBeforeNav = 2000
    const animEndsBefore = 200

    React.useEffect(()=>{
        Popups.startWaiting(setPopupsObj)
        Popups.endWaiting(setPopupsObj, delayBeforeNav - animEndsBefore)

        const deleyedRedirect = setTimeout(()=>{
            nav("/Login")
        }, delayBeforeNav)

        return ()=>clearTimeout(deleyedRedirect)
    }, [])

    return (    
        <main className="w-screen h-96 flex flex-col items-center justify-center gap-3">
            <div className="absolute m-auto left-0 right-0 top-72">
                <Popups.Popups popupsObj={popupsObj}/>
            </div>
            <img src={authImg} className="w-32"/>
            <p className="text-xs text-center">You are not authentication or your authentication time expired. Redirecting to login page.</p>
        </main>
    )
}