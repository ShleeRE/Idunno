import React, { Fragment } from "react";
import pizza from "Assets/pizza.mp4"
import LoginForm from "./LoginForm";

export default function LoginPage(){
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(true)

    function handleVideo(){
      setIsVideoPlaying(prevBoolean => !prevBoolean)
      const vid = videoRef.current
  
      if(!isVideoPlaying){
          vid.play()
      }
      else if(isVideoPlaying ){
        vid.pause()
      }
    }
  
    const videoRef = React.useRef(null)

    return(
    <Fragment>
        <LoginForm/>
        <button className="absolute btn btn-blue bg-amber-300 mx-1 my-1 rounded-sm text-xs w-20" onClick={handleVideo}>{isVideoPlaying ? "Stop Video" : "Play Video"}</button>
        <video className="w-screen h-screen object-cover pointer-events-none" src={pizza} autoPlay loop muted playsInline ref={videoRef}/>
    </Fragment>
    )
}