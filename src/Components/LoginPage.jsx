import React from "react";
import "./LoginPage.css"

export default function LoginPage(){

    const [loginData, setLoginData] = React.useState({login : "", password : ""})

    function handleChange(event){
        setLoginData(prevData => {
            let old = {...prevData, [event.target.name] : event.target.value}
            return old
        })
    }

    function handleSubmit(event){
        event.preventDefault()
    }

    return (
        <div className="LoginPage">
            <h1 className="LoginPage--Header">Idunno</h1>
            <form onSubmit={handleSubmit} className="LoginPage--Form">
                <input type="text" placeholder="Login" onChange={handleChange}
                 value={loginData.login} name="login" className="LoginPage--LoginForm"></input>
                <input type="password" placeholder="Password" onChange={handleChange} value={loginData.password}
                 name="password" className="LoginPage--PasswordForm"></input>
                <button className="LoginPage--ButtonForm">Login</button>
            </form>
        </div>  
    )
}