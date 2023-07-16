import "./App.css";
import Home from "./pages/Home";
import Video from "./components/VideoContainer/video";
import SignUpModal from "./components/Modals/signUp"
import UserProfileHeading from "./components/Profile/profile"
import Navbar from "./components/Header/navBar";

function App() {
  return (
    <div className="app">
      <UserProfileHeading />
      {/* <div className="app_videos">
        <Video />
        <Video />
        <Video />
        <Video />
      </div> */}
    </div>
  );
}

export default App;
