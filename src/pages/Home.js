import React from "react";
import Video from "../components/VideoContainer/video";

export default function Home() {
  return (
    <div className="bg h-screen flex pt-40 justify-center">
      <div className="video-frame">
        <div className="app_videos relative rounded-2xl overflow-scroll">
          <Video />
          <Video />
          <Video />
        </div>
      </div>
    </div>
  );
}
