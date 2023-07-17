import React from "react";
import Video from "../components/VideoContainer/video"

export default function Home() {

  return (
    <div className="app"> 
      <div className="app_videos">
        <Video />
        <Video />
        <Video />
      </div>
    </div>


  );
}
