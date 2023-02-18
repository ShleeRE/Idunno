import React from "react"
import { useNavigate } from "react-router-dom"
import ExpPost from "./ExpPost"

export default function ExpPostsErrorHandler({error}){

    const nav = useNavigate()

    function handleError(){
        const response = error.response
        if(response != undefined){
            const statusCode = response.status
            console.log(statusCode)
            if(statusCode == "401"){ //AUTHENTICATION ERROR CODE
                nav("/Auth")
            }
        }
    }

    React.useEffect(()=>handleError(), [])

    return(
        <div className="w-screen flex justify-center items-center mt-24">
            <ExpPost title="<p><b><em>SERVER ERROR</em></b></p>" description="<p><b><em>SERVER ERROR</em></b></p>"/>
        </div>
    )
}