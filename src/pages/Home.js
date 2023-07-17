import React from "react";
import Video from "../components/VideoContainer/video"

export default function Home() {

  return (
    <div className="h-screen bg-black flex items-center justify-center"> 
      <div className="app_videos relative rounded-2xl overflow-scroll">
        <Video />
        <Video />
        <Video />
      </div>
    </div>


  );
}
