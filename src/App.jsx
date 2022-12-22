import "./index.css"
import LoginPage from "./Components/LoginPage"
import pizza from "./Assets/pizza.mp4"
import React from "react"

function App() {

  const [playVideo, setPlayVideo] = React.useState(true)

  function handleVideo(){
    setPlayVideo(prevBoolean => !prevBoolean)
    
    playVideo ? appRef.current.play() : appRef.current.pause()
  }

  const appRef = React.useRef(playVideo)

  return (
    <div className="w-full h-full">
      <LoginPage/>
      <button className="absolute btn btn-blue bg-amber-300" onClick={handleVideo}>{playVideo ? "Stop Video" : "Play Video"}</button>
      <video className="w-screen h-screen object-cover pointer-events-none" src={pizza} autoPlay loop muted playsInline ref={appRef}/>
    </div>
  );
}

export default App;
