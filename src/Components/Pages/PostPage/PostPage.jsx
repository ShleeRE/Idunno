import React from "react";
import { useParams } from "react-router-dom";
import ExpPost from "../HomeboardPage/Post/ExpPost";
import * as requestHelper from "Helpers/RequestHelper"
import PostPageContent from "./PostPageContent/PostPageContent";

export default function PostPage(){
    
    const {postID} = useParams()
    const [post, setPost] = React.useState()

    React.useEffect(() => {
        requestHelper.getRequest(`Posts/${postID}`)
        .catch(()=>{})
        .then((data)=>{setPost(data)})
    }, [])

    return(
        <div>
           {post && <PostPageContent post={post}/>}
        </div>
    )
}