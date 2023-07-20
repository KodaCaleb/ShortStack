// Importing necessary hooks and functions from React and Firebase
import { useRef, useState, useEffect } from "react";
import VideoFooter from "./videoFooter";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";

// Component for displaying a video
export default function Video({ videoData }) {
  const [playing, setPlaying] = useState(false); // State for managing whether the video is currently playing
  const videoRef = useRef(null); // A ref that points to the video element in the DOM



  useEffect(() => {
     // Extracting the file path from videoData.vidRef, removing the initial part of the Firebase storage URL to keep only the path to the file.
    const filepath = videoData.vidRef.replace('gs://project3-15aff.appspot.com/', '')
    // Creating a reference to the video file in Firebase Storage
    const videoStorageRef = ref(storage, filepath);
    // Fetching the URL of the video file
    getDownloadURL(videoStorageRef)
    .then((url) => {
      // Assigning the fetched URL to the video element's src attribute to display the video
      videoRef.current.src = url;
    })
    .catch((error) => {
      // Logging any errors that happen while fetching the video URL
      console.log("error getting video url", error);
    })
    ;
  }, [videoData]); // This useEffect hook runs whenever videoData changes


  const onVideoPress = () => {
    if (playing) {
      // If the video is currently playing, pause the video and update the state
      videoRef.current.pause();
      setPlaying(false);
    } else {
      // If the video is currently paused, play the video and update the state
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
   <div className="relative bg-white w-full h-full videoContainer mt-4">
      <video className="object-fill w-full h-full" 
        ref={videoRef}
        onClick={onVideoPress} 
        loop 
      >
      </video>
      <VideoFooter />
    </div>
  );
}
