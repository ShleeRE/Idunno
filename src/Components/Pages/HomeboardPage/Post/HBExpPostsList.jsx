import React from "react"
import * as reqHelper from "Helpers/RequestHelper"
import ExpPost from "./ExpPost"
import { useNavigate } from "react-router-dom"
import ExpPostsErrorHandler from "./ExpPostsErrorHandler"

export default function HBExpPostsList({searchMatch}){

    const[posts, setPosts] = React.useState([])
    const[requestInfo, setRequestInfo] = React.useState(()=>{ return {
        hasError : false,
        error : undefined
    }})

    const nav = useNavigate()

    React.useEffect(()=>{
        const searching = searchMatch.length > 0 
        const noun = searching ? `Posts/ByMatch?match=${searchMatch}` : "Posts"

        const getPostsTimeout = setTimeout(()=>{
            reqHelper.getRequest(noun)
            .then(data => setPosts(data))
            .catch(error=>setRequestInfo({hasError : true, error : error}))
        }, searching ? 500 : 0)

            return () => clearTimeout(getPostsTimeout)
    }, [searchMatch])

    const expPosts = posts.map(post => 
        <ExpPost postID={post.postID} key={post.postID} title={post.postTitle} 
        date={post.postDate} description={post.postDescription}
        imagePath={post.imagePath}
        handleClick={()=>{nav(`/Posts/${post.postID}`)}}/>)

    return(
        <main className="m-auto flex flex-col">
            {!requestInfo.hasError ? expPosts : <ExpPostsErrorHandler error={requestInfo.error}/>}
        </main>
    )
}