import React from "react";
import ExpPost from "./ExpPost";
import HBSidebar from "./HBSidebar";
import { useNavigate } from "react-router-dom"
import _ from "lodash";
import cfg from "../../configuration.json"

export default function Homeboard(){

    const[posts, setPosts] = React.useState([])
    const[apiCalls, setApiCalls] = React.useState(0)
    const navigate = useNavigate()

    React.useEffect(()=>{
        async function fetchData(){
            await fetch(cfg.Development.API_SERVER + "Posts").then(res => {
                if(!res.ok){
                    throw new Error(res.status)
                }else{
                    return res.json()
                }
            }).then(data => {
                if(!_.isEqual(posts, data)){
                    setPosts(data)
                }
            })
            .catch(error => setPosts(null))
        }

        fetchData()

    }, [apiCalls])

    React.useEffect(()=>{
        const interval = setInterval(()=>{
            setApiCalls(prevCount => prevCount+1)
        }, 10 * 1000) // change apiCalls so useEffect will run and check if there are new posts (10 seconds for development sake)

        return ()=>clearInterval(interval)
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
            return(
            <div className="mt-24 tablet:mt-16">
                <ExpPost postID={-1} key={-1} title="POSTS NOT FOUND"
                description="We were unable to receive posts. We are sorry. Please try later."/>
            </div>)
        }
        else if(expPosts.length === 0 && apiCalls > 0)
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