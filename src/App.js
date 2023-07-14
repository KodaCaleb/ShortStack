import "./App.css";
import Home from "./pages/home";
import Video from "./components/VideoContainer/video";

function App() {
  return (
    <div className="app">
      <Home />
      <div className="app_videos">
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
    </div>
  );
}

export default App;
