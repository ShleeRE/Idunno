import React from "react";
import { useParams } from "react-router-dom";
import ExpPost from "../HomeboardPage/Post/ExpPost";
import * as requestHelper from "Helpers/RequestHelper"
import PostPageContent from "./PostPageContent/PostPageContent";

export default function PostPage(){
    
    const {postId} = useParams()
    const [post, setPost] = React.useState()
    console.log(post)
    React.useEffect(() => {
        requestHelper.getRequest(`Posts/${postId}`)
        .catch(()=>{})
        .then((postData)=>{
            console.log(postData)
            requestHelper.getRequest(`Users/${postData.userId}`)
                .catch(()=>{})
                .then((userNameData)=>{
                    setPost({...postData, postAuthor : userNameData})
                })
        })    
    }, [])

    return(
        <div>
           {post && <PostPageContent post={post}/>}
            <button className="bg-blue-500 rounded-sm px-0.5 border-red-900 border-x-2 border-y-2">Ask an author</button>
        </div>
    )
}