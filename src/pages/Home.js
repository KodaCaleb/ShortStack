import React from "react";
import Video from "../components/VideoContainer/video";
import { FaHeart } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="bg h-screen flex pt-40 justify-center">
      <div className="flex flex-row items-end">
        <div className="video-frame h-800 p-2 w-auto">
          <div className="app_videos h-full w-full max-w-500px relative rounded-2xl overflow-scroll">
            <Video />
            <Video />
            <Video />
          </div>
        </div>
        <div className="m-5" style={{color: 'red'}}>
          <FaHeart size={32} />
        </div>
      </div>
    </div>
  );
}
