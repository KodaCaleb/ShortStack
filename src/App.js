import "./App.css";
import Home from "./pages/Home";
import Video from "./components/VideoContainer/video";
import LoginModal from "./components/Modals/login"
import SignUpModal from "./components/Modals/signUp"

function App() {
  return (
    <div className="app">
      <Home />
      <LoginModal />
      <SignUpModal />
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
