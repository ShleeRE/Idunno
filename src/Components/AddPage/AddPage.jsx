import React from "react"
import { useNavigate } from "react-router-dom"

export default function AddPage(){

    const [postData, setPostData] = React.useState({title : "", description : ""})
    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault()
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
                <input type="text" placeholder="Title" onChange={handleChange}
                 value={postData.title} name="title" className="text-sm text-center w-56 tablet:w-72 laptop:w-80"></input>
                <input type="text" placeholder="Description" onChange={handleChange} value={postData.description}
                 name="description" className="text-sm w-56 h-24 tablet:w-72 tablet:h-32 laptop:w-80 laptop:h-40"></input>
                <button className="bg-green-400 my-1 px-1.5 hover:bg-gray-500 font-medium phone:text-sm laptop:text-base">Add</button>
            </form>
        </div>
    )
}