import "../../index.css"
import React from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"
import cfg from "../../configuration.json"
import {Modals} from "./Modals"

export default function LoginForm(){

    const [visibleModals, setVisibleModals] = React.useState({waitingModal : false, errorModal : false})
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

        setVisibleModals(prevModals => {
            return({...prevModals, waitingModal : true})
        })

        async function fetchRegister(){
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
            
            await fetch(cfg.Development.API_SERVER + "Register", request).then(res => {
                console.log(res)

            }).catch(() => {
                setVisibleModals(prevModals => {
                    return({...prevModals, errorModal : true})
                })
            })

            setVisibleModals(prevModals => {
                return({...prevModals, waitingModal : false})
            })
        }

        fetchRegister()

        event.preventDefault()
    }

    React.useEffect(()=>{
        setTimeout(()=>{
            setVisibleModals(prevModals =>{
                return{...prevModals, errorModal : false}
            })
        }, 3000)
    }, [visibleModals.errorModal])

    function checkIfDisabled(){
        for(var key in visibleModals){
            if(visibleModals[key] === true){
                return true
            }
        }
        return false
    }

    return (
        <div className="absolute flex flex-col my-1">    
            <h1 className="text-white self-center phone:text-3xl tablet:text-4xl laptop:text-5xl desktop:text-6xl">Idunno</h1>
            <Modals visibleModals={visibleModals}/>
            <form className="flex flex-col items-center justify-items-center w-screen gap-1">
                <input type="text" placeholder="Username" onChange={handleChange}
                 value={loginData.username} name="username" className="text-sm text-center phone:w-24 laptop:w-36"></input>
                <input type="password" placeholder="Password" onChange={handleChange} value={loginData.password}
                 name="password" className="text-sm text-center phone:w-24 laptop:w-36"></input>
                <div className="grid grid-cols-2 gap-1">
                    <button className="bg-green-400 my-1 px-1.5 hover:bg-gray-500 font-medium phone:text-sm laptop:text-base disabled:bg-red-800"
                    onClick={handleRegisterSubmit} type="button" disabled={checkIfDisabled()}>Register</button>
                    <button className="bg-green-400 my-1 px-1.5 hover:bg-gray-500 font-medium phone:text-sm laptop:text-base disabled:bg-red-800" 
                    onClick={handleLoginSubmit} type="submit" disabled={checkIfDisabled()}>Login</button>
                </div>
            </form>
        </div>
    )
}