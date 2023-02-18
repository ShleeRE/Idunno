import demoImg from "Assets/Demo.jpg"
import { rawHtmlToJSX, rawHtmlToJSXWithClass } from "Helpers/Utilities"
export default function PostPageContent({post}){
    return (
        <article className="m-auto">
            {rawHtmlToJSXWithClass(post.postTitle, "p", "text-center text-xs xs:text-sm")}
            <section className="laptop:flex justify-center items-center">
                <img className="w-32 tablet:w-72 laptop:w-80 laptop:mr-5 m-auto laptop:m-0" src={demoImg} alt="post"/>
                {rawHtmlToJSXWithClass(post.postDescription, "p", "w-32 text-xs xs:text-sm xs:w-48 break-words text-center m-auto laptop:m-0")}
            </section>  
        </article>
    )
} 