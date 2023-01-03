import React from "react";
import ExpPost from "./ExpPost";
import HBSidebar from "./HBSidebar";
import { useNavigate } from "react-router-dom"

export default function Homeboard(){

    const[posts, setPosts] = React.useState([])
    const[triedFetch, setTriedFetch] = React.useState(false)
    const navigate = useNavigate()

    React.useEffect(()=>{
        async function fetchData(){
            const response = await fetch("https://localhost:7190/api/Posts").then(res => {
                setTriedFetch(true)
                if(!res.ok){
                    throw new Error(res.status)
                }else{
                    return res.json()
                }
            }).then(data => setPosts(data))
            .catch(error => setPosts(null))
        }

        fetchData()
    }, [])

    function handlePostClick(postID){
        navigate(`/Posts/${postID}`)
    }

    let expPosts

    if(posts != null){
        expPosts = posts.map(post => <ExpPost postID={post.postID} key={post.postID} title={post.postTitle} 
            date={post.postDate} description={post.postDescription} imagePath={post.imagePath} handleClick={handlePostClick}/>)
    }
    
    function noPostsFeedback(){

        if(posts === null){
            return <ExpPost postID={-1} key={-1} title="POSTS NOT FOUND"
            description="We were unable to receive posts. We are sorry. Please try later."/>
        }
        else if(expPosts.length === 0 && triedFetch)
        {
            return <ExpPost postID={0} key={0} title="NO POSTS"
                description="There are no posts. Don't hesitate and add something new!"/>
        }

        return null     
    }

    return(
        <div className="w-screen h-full overflow-y-auto">
            <HBSidebar/>
            <main className="m-auto flex flex-col">
                {(posts != null && expPosts.length > 0) ? expPosts : noPostsFeedback() }
            </main>
        </div>
    )
}