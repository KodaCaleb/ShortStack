import React from "react";
import Video from "../components/VideoContainer/video";

export default function Home() {
  return (
    <div className="bg h-screen flex pt-40 justify-center">
      <div className="bg-black h-4/5 rounded-2xl p-2 w-auto">
        <div className="app_videos h-full w-full max-w-500px relative rounded-2xl overflow-scroll">
          <Video />
          <Video />
          <Video />
        </div>
      </div>
    </div>
  );
}
