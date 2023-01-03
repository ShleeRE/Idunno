import React from "react"
import { useNavigate } from "react-router-dom"

export default function AddPage(){

    const [postData, setPostData] = React.useState({title : "", description : ""})
    const navigate = useNavigate()

    async function addNewPost(){

        const requestBody = {
            userID : 1, // TO DO
            postTitle : postData.title,
            postDescription : postData.description,
            imagePath : "to_do"
        }

        const request = {
            method : "Post",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(requestBody)
        }

        const response = await fetch("https://localhost:7190/api/Posts", request).then(res => {
                if(!res.ok){
                    throw new Error(res.status)
                }
            })
    }

    function handleSubmit(event){
        event.preventDefault()
        addNewPost()
        navigate("/Homeboard")
    }

    function handleChange(event){
        setPostData(prevData => {
            let old = {...prevData, [event.target.name] : event.target.value}
            return old
        })
    }

    return (
        <div className="absolute flex flex-col my-1">
            <form className="flex flex-col items-center justify-items-center w-screen gap-1" onSubmit={handleSubmit}>
                <textarea type="text" placeholder="Title" onChange={handleChange}
                 value={postData.title} name="title" className="text-sm text-center overflow-hidden truncate w-56 h-5 tablet:w-72 laptop:w-80"></textarea>
                <textarea type="text" placeholder="Description" onChange={handleChange} value={postData.description} cols="30" rows="10"
                 name="description" className="text-sm w-56 h-24 tablet:w-72 tablet:h-32 laptop:w-80 laptop:h-40"></textarea>
                <button className="bg-green-400 my-1 px-1.5 hover:bg-gray-500 font-medium phone:text-sm laptop:text-base">Add</button>
            </form>
        </div>
    )
}