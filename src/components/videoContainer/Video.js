import { useRef, useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";

export default function Video({ videoData }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // State for tracking video progress
  const [volume, setVolume] = useState(1);

  const videoRef = useRef(null);
  const progressRef = useRef(null); // Ref for the progress bar

  useEffect(() => {
    const filepath = videoData.vidRef.replace(
      "gs://project3-15aff.appspot.com/",
      ""
    );
    const videoStorageRef = ref(storage, filepath);
    getDownloadURL(videoStorageRef)
      .then((url) => {
        videoRef.current.src = url;
      })
      .catch((error) => {
        console.log("error getting video url", error);
      });
  }, [videoData]);

  // Function to update video progress as it plays
  const handleTimeUpdate = () => {
    const progress = videoRef.current.currentTime / videoRef.current.duration;
    setProgress(progress);
  };

  // Function to scrub through video when progress bar is clicked
  const handleScrub = (e) => {
    const scrubTime =
      (e.nativeEvent.offsetX / progressRef.current.offsetWidth) *
      videoRef.current.duration;
    videoRef.current.currentTime = scrubTime;
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    videoRef.current.volume = e.target.value;
  };

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
    <div className="w-1/2 h-full videoContainer">
      <div className="video-container relative">
        <video
          className="object-fill rounded w-auto h-auto"
          ref={videoRef}
          onClick={onVideoPress}
          loop
          onTimeUpdate={handleTimeUpdate}
        ></video>
        <progress
          ref={progressRef}
          className="video-progress w-full h-2 cursor-pointer absolute bottom-0 opacity-0 transition-opacity duration-200"
          value={progress}
          max="1"
          onClick={handleScrub}
        ></progress>
        <input
          type="range"
          min="0"
          max=".5"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-2 video-progress cursor-pointer absolute bottom-4 right-0 opacity-0 transition-opacity duration-200" // Apply similar hover effect as progress bar
        />
      </div>
    </div>
  );
}

// className="w-full video-progress" ref={progressRef} value={progress} max="1" onClick={handleScrub}>
