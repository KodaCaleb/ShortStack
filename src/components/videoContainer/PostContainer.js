import React from "react";
import Video from "./Video";
import { AiOutlineHeart } from 'react-icons/ai';
import { BiCommentDetail, BiShare, BiBookmarks } from 'react-icons/bi';

export default function PostContainer({ videoData }) {
    return (
        <div className="flex justify-center flex-row snap start">
            <div className=" h-full rounded-3xl p-5 w-3/4 bg-black">
            {/* How can we import the username variable here? */}
                <div className="username text-amber-200 text-xl"><p>Username | Bio </p>
                <p>{videoData.title}</p></div>
                <hr className="mt-2 mb-2"/>
                <div className="app_videos h-full flex justify-center relative rounded-2xl overflow-scroll">
                    <Video videoData={videoData} />
                </div>
            </div>
            <div>
                <a href="/"><AiOutlineHeart className="m-5" style={{color: 'tan'}} size={32} /></a>
                <a href="/"><BiCommentDetail className="m-5" style={{color: 'tan'}} size={32} /></a>
                <a href="/"><BiBookmarks className="m-5" style={{color: 'tan'}} size={32} /></a>
                <a href="/"><BiShare className="m-5" style={{color: 'tan'}} size={32} /></a>
            </div>
        </div>
    );
}