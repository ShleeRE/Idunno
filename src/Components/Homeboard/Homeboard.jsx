import React from "react";
import ExpPost from "./ExpPost";
import HBSidebar from "./HBSidebar";

export default function Homeboard(){

    const[posts, setPosts] = React.useState([])

    React.useEffect(()=>{

        async function fetchData(){
            const response =  await fetch("https://localhost:7190/api/Posts").then(res => {
                if(!res.ok){
                    throw new Error(res.status)
                }else{
                    return res.json()
                }
            }).then(data => setPosts(data))
            .catch(error => setPosts([]))
        }

        fetchData()
    }, [])

    const expPosts = posts.map(post => <ExpPost postID={post.postID} key={post.postID} title={post.postTitle} 
        date={post.postDate} description={post.postDescription} imagePath={post.imagePath}/>)

    console.log(posts)
    return(
        <div className="w-screen h-full bg-orange-400">
            <HBSidebar/>
            <main className="m-auto flex flex-col w-100 h-100">
                {expPosts.length > 0 ? expPosts : null } {/*to do: no posts component*/}
            </main>
        </div>
    )
}