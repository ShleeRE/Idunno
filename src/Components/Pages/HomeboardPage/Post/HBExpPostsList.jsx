import React from "react"
import * as reqHelper from "Helpers/RequestHelper"
import ExpPost from "./ExpPost"
import { useNavigate } from "react-router-dom"
import ExpPostsErrorHandler from "./ExpPostsErrorHandler"
import * as Popups from "Components/Popups/Popups"

export default function HBExpPostsList({searchMatch}){

    const[posts, setPosts] = React.useState([])
    const [popupsObj, setPopupsObj] = React.useState(Popups.popupsObject)
    const[requestInfo, setRequestInfo] = React.useState(()=>{ return {
        hasError : false,
        error : undefined
    }})

    const nav = useNavigate()

    React.useEffect(()=>{
        const searching = searchMatch.length > 0 
        const noun = searching ? `Posts/ByMatch?match=${searchMatch}` : "Posts"

        const waitingAction = Popups.startWaiting(setPopupsObj, searching > 0 ? 500 : 0)

        const getPostsTimeout = setTimeout(()=>{
            reqHelper.getRequest(noun)
            .then(data => setPosts(data))
            .catch(error=>setRequestInfo({hasError : true, error : error}))
            .finally(()=>Popups.endWaiting(setPopupsObj))
        }, searching > 0 ? 1000 : 0)

            return () => {
                clearTimeout(getPostsTimeout)
                if(searching > 0){
                    clearTimeout(waitingAction)
                }
            }
    }, [searchMatch])

    const expPosts = posts.map(post => 
        <ExpPost postId={post.postId} key={post.postId} title={post.postTitle} 
        date={post.postDate} description={post.postDescription}
        imagePath={post.imagePath}
        handleClick={()=>{nav(`/Posts/${post.postId}`)}}/>)

    return(
        <main className="m-auto flex flex-col">
            <div className="absolute m-auto left-0 right-0 top-44">
                <Popups.Popups popupsObj={popupsObj}/>
            </div>
            {!requestInfo.hasError ? expPosts : <ExpPostsErrorHandler error={requestInfo.error}/>}
        </main>
    )
}