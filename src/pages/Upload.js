import React from "react";
import VideoInput from "../utils/VideoInput";

export default function Upload() {
  return (
    <>
      <div className="w-3/4 flex-col m-auto mt-20">
        <h1 className="text-white text-center text-3xl p-5">
          Select a video to upload
        </h1>
        <div className="w-full">
        <VideoInput />
        </div>
      </div>
    </>
  );
}
