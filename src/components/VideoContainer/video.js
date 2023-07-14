import { useRef, useState } from "react";
import "../../Video.css";
import sampleVid1 from "../../assets/sampleVid1.mp4";

function Video() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const onVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="videoContainer">
      <video 
      className="videoPlayer" 
      src={sampleVid1} 
      ref={videoRef}
      onClick={onVideoPress} 
      loop 
      ></video>
      {/* <VideoFooter />*/}
      {/* <VideoSideBar /> */}
    </div>
  );
}

export default Video;
