import React from "react";
import img1 from "../../Assets/Image1.jpg"
import img2 from "../../Assets/Image2.jpg"
import img3 from "../../Assets/Image3.jpg"


export default function ExpPost(props){

    function getImage(){
        if(props.postID % 3 == 0){
            return img1
        }
        else if(props.postID % 2 == 0){
            return img2
        }
        else{
            return img3
        }
    }

    return(
        <article className="text-white border mb-10 w-44 m-auto mt-1">
            <section className="flex flex-row gap-5">
                <p>{props.title}</p>
                <p className=" text-xs">{props.date}</p>
            </section>
            <img src={getImage()} className="w-44 h-44"/>
            <p>{props.description}</p>
        </article>
    )
}