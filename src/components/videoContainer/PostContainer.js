import React from "react";
import Video from "./Video";
import { AiOutlineHeart } from 'react-icons/ai';
import { BiCommentDetail, BiShare, BiBookmarks } from 'react-icons/bi';

export default function PostContainer({ videoData }) {
    return (
        <div className="flex justify-center flex-row border-8 border-sky-300">
            <div className=" h-full rounded-2xl p-2 w-3/4 bg-black border-4 border-fuchsia-700">
                <div className="app_videos h-full flex justify-center relative rounded-2xl overflow-scroll border-4 border-lime-500">
                    <Video videoData={videoData} />
                </div>
            </div>
            <div className="border-4 border-rose-200">
                <a href="/"><AiOutlineHeart className="m-5" style={{color: 'tan'}} size={32} /></a>
                <a href="/"><BiCommentDetail className="m-5" style={{color: 'tan'}} size={32} /></a>
                <a href="/"><BiBookmarks className="m-5" style={{color: 'tan'}} size={32} /></a>
                <a href="/"><BiShare className="m-5" style={{color: 'tan'}} size={32} /></a>
            </div>
        </div>
    );
}