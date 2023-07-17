import { useRef, useState } from "react";
import sampleVid1 from "../../assets/sampleVid1.MP4";

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
    <div className="relative bg-white w-full h-full videoContainer mt-4">
      <video className="object-fill w-full h-full" 
      src={sampleVid1} 
      ref={videoRef}
      onClick={onVideoPress} 
      loop 
      ></video>
    </div>
  );
}

export default Video;
