import React from "react"
import { RichUtils } from "draft-js"

export default function ItalicButton({editorState, setEditorState}){
    function italicText(e){
        e.preventDefault()
        setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"))
    }
    return (
        <div className="my-1 bg-gray-800 text-red-400 text-center px-1 rounded flex text-xxs">
            <button className="italic" type="button" onMouseDown={italicText}>Italic</button>
        </div>
    )
}