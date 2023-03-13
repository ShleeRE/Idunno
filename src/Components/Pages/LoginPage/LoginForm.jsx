import "index.css"
import React from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"
import * as Popups from "Components/Popups/Popups"
import * as reqHelper from "Helpers/RequestHelper"
import {checkIfAnyIsTrue} from "Helpers/Utilities"

export default function LoginForm(){
    const [popupsObj, setPopupsObj] = React.useState(()=>Popups.popupsObject)

    const [loginData, setLoginData] = React.useState({username : "admin", password : "admin"})
    const navigate = useNavigate()

    const salt = bcrypt.genSaltSync(12)

    function handleChange(event){
        setLoginData(prevData => {
            let old = {...prevData, [event.target.name] : event.target.value}
            return old
        })
    }

    function handleLoginSubmit(event){
        Popups.startWaiting(setPopupsObj)

        const hashedPassword = bcrypt.hashSync(loginData.password, salt)

        const credentials = {
            username : loginData.username,
            password : hashedPassword
        }
        console.log(credentials)
        reqHelper.postRequest("Login", credentials).catch((err)=>{
            Popups.setErrorMessage(setPopupsObj, err)
            Popups.endWaiting(setPopupsObj)
            Popups.startError(setPopupsObj, 300)

            }).then(token => {
                if(token != undefined){
                    navigate("/Homeboard")
                }
                Popups.endWaiting(setPopupsObj)
            })

        event.preventDefault()
    }

    function handleRegisterSubmit(event){
        Popups.startWaiting(setPopupsObj)

        const hashedPassword = bcrypt.hashSync(loginData.password, salt)

        const credentials = {
            username : loginData.username,
            password : hashedPassword
        }

        reqHelper.postRequest("Register", credentials).catch((err)=>{
                Popups.setErrorMessage(setPopupsObj, err)
                Popups.endWaiting(setPopupsObj)
                Popups.startError(setPopupsObj, 300)
            }).then(()=>Popups.endWaiting(setPopupsObj))

        event.preventDefault()
    }

    React.useEffect(()=>{
        if(popupsObj.visiblePopups.errorPopup){
            Popups.endError(setPopupsObj, 3000)
        }
    }, [popupsObj.visiblePopups.errorPopup])

    return (
        <div>
            <div className="absolute m-auto left-0 right-0 top-36">
                <Popups.Popups popupsObj={popupsObj}/>
            </div>
            <div className="absolute flex flex-col my-1 h-96">    
            <h1 className="text-white self-center text-3xl tablet:text-4xl laptop:text-5xl desktop:text-6xl overflow-hidden">Idunno</h1>
                <form className="flex flex-col items-center justify-items-center w-screen gap-1">
                    <input type="text" placeholder="Username" onChange={handleChange}
                    value={loginData.username} name="username" className="text-sm text-center w-24 laptop:w-36"></input>
                    <input type="password" placeholder="Password" onChange={handleChange} value={loginData.password}
                    name="password" className="text-sm text-center w-24 laptop:w-36"></input>
                    <div className="grid grid-cols-2 gap-1">
                        <button className="bg-green-400 my-1 px-1.5 hover:bg-gray-500 font-medium text-sm laptop:text-base disabled:bg-red-800"
                        onClick={handleRegisterSubmit} type="button" disabled={checkIfAnyIsTrue(popupsObj.visiblePopups)}>Register</button>
                        <button className="bg-green-400 my-1 px-1.5 hover:bg-gray-500 font-medium text-sm laptop:text-base disabled:bg-red-800" 
                        onClick={handleLoginSubmit} type="submit" disabled={checkIfAnyIsTrue(popupsObj.visiblePopups)}>Login</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}