import "../index.css"
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm(){

    const [loginData, setLoginData] = React.useState({login : "", password : ""})
    const navigate = useNavigate()

    function handleChange(event){
        setLoginData(prevData => {
            let old = {...prevData, [event.target.name] : event.target.value}
            return old
        })
    }

    function handleSubmit(event){
        navigate("/Homeboard")
        event.preventDefault()
    }

    return (
        <div className="absolute flex flex-col my-1">
            <h1 className="text-white self-center phone:text-3xl tablet:text-4xl laptop:text-5xl desktop:text-6xl">Idunno</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-items-center w-screen gap-1">
                <input type="text" placeholder="Login" onChange={handleChange}
                 value={loginData.login} name="login" className="text-sm text-center phone:w-24 laptop:w-36"></input>
                <input type="password" placeholder="Password" onChange={handleChange} value={loginData.password}
                 name="password" className="text-sm text-center phone:w-24 laptop:w-36"></input>
                <div className="grid grid-cols-2 gap-1">
                    <button className="bg-green-400 my-1 px-1.5 hover:bg-gray-500 font-medium phone:text-sm laptop:text-base">Register</button>
                    <button className="bg-green-400 my-1 px-1.5 hover:bg-gray-500 font-medium phone:text-sm laptop:text-base">Login</button>
                </div>
            </form>
        </div>
    )
}