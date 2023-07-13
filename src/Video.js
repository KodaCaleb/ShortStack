import "./Video.css";
import sampleVid1 from "./assets/sampleVid1.mp4";

function Video() {
  return (
    <div className="videoContainer">
      <video 
      className="videoPlayer" 
      src={sampleVid1} 
      autoPlay 
      loop 
      controls
      ></video>
      {/* <VideoFooter />*/}
      {/* <VideoSideBar /> */}
    </div>
  );
}

export default Video;
