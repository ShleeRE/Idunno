import React from "react";
import img1 from "../../Assets/Image1.jpg"
import img2 from "../../Assets/Image2.jpg"  
import imgNotFound from "../../Assets/imgNotFound.jpg"
import imgError from "../../Assets/imgError.jpg"


export default function ExpPost(props){

    function getImage(){
        if(props.postID === 0){     // regular post received from API cannot have id === 0 or -1
                                    // It will be used for ExpPost instanced prepared as response for not getting any posts.
            return imgError;
        }
        else if(props.postID === -1){
            return imgNotFound;
        }
        else if(props.postID % 3 === 0){
            return img1
        }
        else{
            return img2
        }
    }

    return(
        <article className="text-white mb-10 w-44 m-auto mt-1 tablet:w-60 laptop:w-72">
            <section className="flex flex-row gap-5">
                <p className="m-auto">{props.title}</p>
            </section>
            {props.date && <p className="text-center text-xxs tablet:text-xs">{props.date}</p>}
            <img src={getImage()} alt="post" className="object-cover my-2 m-auto h-44 tablet:h-60 laptop:h-72" onClick={()=>props.handleClick(props.postID)}/>
            <p className="line-clamp-5 text-center">{props.description}</p>
        </article>
    )
}