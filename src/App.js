import "./App.css"
import LoginPage from "./Components/LoginPage"
import pizza from "./Assets/pizza.mp4"


function App() {
  return (
    <div className="App">
      <LoginPage/>
      <video className="App--BgVideo" src={pizza} autoPlay loop muted playsInline/>
    </div>
  );
}

export default App;
