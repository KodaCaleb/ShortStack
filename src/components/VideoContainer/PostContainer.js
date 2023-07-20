import React from "react";
import Video from "./Video";
import { AiOutlineHeart } from 'react-icons/ai';
import { BiCommentDetail, BiShare, BiBookmarks } from 'react-icons/bi';

export default function PostContainer() {
    return (
        <div className="bg h-screen flex pt-40 justify-center">
            <div className="flex flex-row">
                <div className="bg-black h-4/5 rounded-2xl p-2 w-auto">
                    <div className="app_videos h-full w-full max-w-500px relative rounded-2xl overflow-scroll">
                        <Video />
                        <Video />
                        <Video />
                    </div>
                </div>
                <div className="">
                    <a href=""><AiOutlineHeart className="m-5" style={{color: 'tan'}} size={32} /></a>
                    <a href=""><BiCommentDetail className="m-5" style={{color: 'tan'}} size={32} /></a>
                    <a href=""><BiBookmarks className="m-5" style={{color: 'tan'}} size={32} /></a>
                    <a href=""><BiShare className="m-5" style={{color: 'tan'}} size={32} /></a>
                </div>
            </div>
        </div>
    )
}