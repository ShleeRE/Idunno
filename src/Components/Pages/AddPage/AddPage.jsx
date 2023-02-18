import React from "react"
import { useNavigate } from "react-router-dom"
import * as reqHelper from "Helpers/RequestHelper"
import * as Popups from "Components/Popups/Popups"
import Warning from "./Warning/Warning"
import PostTextEditor from "./Editors/PostTextEditor"
import PostPageContent from "../PostPage/PostPageContent/PostPageContent"
import { EditorState } from "draft-js"
import { getEditorText, getEditorTextLength } from "Helpers/Utilities"



export default function AddPage(){
    
    const [popupsObj, setPopupsObj] = React.useState(Popups.popupsObject)
    const [titleEditorState, setTitleEditorState] = React.useState(() => EditorState.createEmpty())
    const [descriptionEditorState, setDescriptionEditorState] = React.useState(() => EditorState.createEmpty())
    const [tries, setTries] = React.useState(0)

    const editors = {
        titleEditor :{
            state : titleEditorState,
            setState : setTitleEditorState
        },
        descriptionEditor : {
            state : descriptionEditorState,
            setState : setDescriptionEditorState
        }
    }

    const navigate = useNavigate()

    function addNewPost(){
        Popups.startWaiting(setPopupsObj)
        reqHelper.postRequest("Posts", {
            postTitle : getEditorText(titleEditorState),
            postDescription : getEditorText(descriptionEditorState),
            imagePath : "foo_bar"
        })
        .then(() => setTimeout(()=>{
            Popups.endWaiting(setPopupsObj)
            navigate("/Homeboard")
        }), 2000)
        .catch(() =>{
            Popups.endWaiting(setPopupsObj)
            Popups.startError(setPopupsObj)
            Popups.endError(setPopupsObj, 3000)
        })
    }

    function checkFormRequirements(){
        if(getEditorTextLength(titleEditorState) >= 3 &&
        getEditorTextLength(descriptionEditorState) >= 10) return true

        return false
    }

    function handleSubmit(event){
        incrementTries()

        event.preventDefault()

        if(checkFormRequirements()){
            addNewPost()
        }
    }

    function incrementTries(){
        setTries(prevCount => prevCount + 1)
    }

    function warningVisibility(state, min){
        if(getEditorTextLength(state) < min && tries > 0){
            return true
        }

        return false
    }

    const previewPost = {
        postTitle : getEditorTextLength(titleEditorState) > 0 ?
                             getEditorText(titleEditorState) : 
                                    "<p style='color:grey;'><strong><em>There should be a title.</em</strong></p>",
        postDescription : getEditorTextLength(descriptionEditorState) > 0 ? 
                            getEditorText(descriptionEditorState) : 
                                    "<p style='color:grey;'><strong><em>There should be a description.</em</strong></p>"
    }

    function responsivePopups() {
        const whileWaiting = "absolute m-auto left-0 right-0 top-60 tablet:top-80 laptop:top-2/3"
        const whileError = "absolute m-auto left-0 right-0 top-32 tablet:top-36"

        if(popupsObj.visiblePopups.errorPopup){
            return whileError
        }
        
        return whileWaiting
    }

    return (
        <div className="flex flex-col my-1 overflow-x-hidden">
            <div className={responsivePopups()}>
                <Popups.Popups popupsObj={popupsObj}/>
            </div>
            <form className="flex flex-col items-center justify-items-center w-screen gap-1" onSubmit={handleSubmit}>
                <Warning visible={warningVisibility(titleEditorState, 3)} message="Title should be at least 3 characters long."/>
                <Warning visible={warningVisibility(descriptionEditorState, 10)} 
                    message="Description should be at least 10 characters long."/>
                <PostTextEditor editors={editors}/>
                <button className="bg-green-400 my-1 px-1.5 hover:bg-gray-500 font-medium phone:text-sm laptop:text-base">Add</button>
                <section className="mt-3">
                    <PostPageContent post={previewPost}/>
                </section>
                
            </form>
        </div>
    )
}