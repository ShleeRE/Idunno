import "../../index.css"
import React from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"
import cfg from "../../configuration.json"
import * as Modals from "./Modals"

export default function LoginForm(){


    const [modalsToShow, setModalsToShow] = React.useState({waitingModal : false})
    const [loginData, setLoginData] = React.useState({username : "", password : ""})
    const navigate = useNavigate()

    const salt = bcrypt.genSaltSync(12)

    function handleChange(event){
        setLoginData(prevData => {
            let old = {...prevData, [event.target.name] : event.target.value}
            return old
        })
    }

    function handleLoginSubmit(event){
        event.preventDefault()
    }

    function handleRegisterSubmit(event){

        setModalsToShow(prevModals => {
            return({...prevModals, waitingModal : true})
        })

        const hashedPassword = bcrypt.hashSync(loginData.password, salt)

        const requestBody = {
            username : loginData.username,
            password : hashedPassword
        }

        const request = {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(requestBody)
        }

        async function fetchRegister(){
            await fetch(cfg.Development.API_SERVER + "Register", request).then(res => {
                console.log(res)
            }).catch(err => console.log(err))
        }

        fetchRegister()

        event.preventDefault()
    }

    return (
        <div className="absolute flex flex-col my-1">
            {modalsToShow.waitingModal && <Modals.waitingModal/>}        
            <h1 className="text-white self-center phone:text-3xl tablet:text-4xl laptop:text-5xl desktop:text-6xl">Idunno</h1>
            <form className="flex flex-col items-center justify-items-center w-screen gap-1">
                <input type="text" placeholder="Username" onChange={handleChange}
                 value={loginData.username} name="username" className="text-sm text-center phone:w-24 laptop:w-36"></input>
                <input type="password" placeholder="Password" onChange={handleChange} value={loginData.password}
                 name="password" className="text-sm text-center phone:w-24 laptop:w-36"></input>
                <div className="grid grid-cols-2 gap-1">
                    <button className="bg-green-400 my-1 px-1.5 hover:bg-gray-500 font-medium phone:text-sm laptop:text-base"
                    onClick={handleRegisterSubmit} type="button">Register</button>
                    <button className="bg-green-400 my-1 px-1.5 hover:bg-gray-500 font-medium phone:text-sm laptop:text-base" 
                    onClick={handleLoginSubmit} type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}