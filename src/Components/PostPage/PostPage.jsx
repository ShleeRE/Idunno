import React from "react";
import { useParams } from "react-router-dom";

export default function PostPage(){
    
    const {postID} = useParams()

    return(
        <h1>{postID}</h1>
    )
}