import { useRef, useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { MoonLoader } from "react-spinners";

export default function Video({ videoData, fullSize }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // State for tracking video progress
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);
  const progressRef = useRef(null); // Ref for the progress bar

  const videoClass = fullSize ? "object-fill rounded w-full h-full" : "object-fill rounded w-auto h-auto";
  const containerClass = fullSize ? "w-full h-full videoContainer" : "w-1/4 mb-4 h-full mt-4 videoContainer";

  useEffect(() => {
    const filepath = videoData.vidRef.replace(
      "gs://project3-15aff.appspot.com/",
      ""
    );
    const videoStorageRef = ref(storage, filepath);
    getDownloadURL(videoStorageRef)
      .then((url) => {
        videoRef.current.src = url;
        videoRef.current.onloadeddata = () => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        };
      })
      .catch((error) => {
        console.log("error getting video url", error);
      });
  }, [videoData]);

  // Function to update video progress as it plays
  const handleTimeUpdate = () => {
    if (videoRef.current.duration > 0) {
      const progress = videoRef.current.currentTime / videoRef.current.duration;
      setProgress(progress);
    }
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
    <div className={containerClass}>
      <div className="video-container relative">
        {isLoading && (
          <div className=" top-0 right-0 bottom-0 left-0 flex items-center justify-center">
            <MoonLoader color="#e0a712" loading={isLoading} size={80} />
          </div>
        )}
        <video
          className={videoClass}
          ref={videoRef}
          onClick={onVideoPress}
          // preload="metadata"
          loop
          onTimeUpdate={handleTimeUpdate}
          hidden={isLoading}
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
          className="w-24 h-2 video-progress cursor-pointer absolute bottom-4 right-0 opacity-0 transition-opacity duration-200"
        />
      </div>
    </div>
  );
}