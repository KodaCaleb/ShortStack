import React, { useEffect, useState } from "react";
import Video from "./video";
import { AiOutlineHeart } from 'react-icons/ai';
import { BiCommentDetail, BiShare, BiBookmarks } from 'react-icons/bi';
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";


export default function PostContainer() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videosCollection = collection(firestore, "videos");
                const videosSnapshot = await getDocs(videosCollection);
                const videosData = videosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setVideos(videosData);
                // console.log("LOOK HERE", videosData);
            } catch (error) {
                console.error("Error fetching videos", error);
            }
        };
            
        fetchVideos();
    }, []);


    return (
        <div className="h-screen flex pt-40 justify-center">
            <div className="flex flex-row">
                <div className="bg-black h-4/5 rounded-2xl p-2 w-auto">
                    <div className="app_videos h-full w-full max-w-500px relative rounded-2xl overflow-scroll">
                        {videos.map((video) => (
                            <Video key={video.id} videoData={video} />
                        ))}
                    </div>
                </div>
                <div className="">
                    <a href="/"><AiOutlineHeart className="m-5" style={{color: 'tan'}} size={32} /></a>
                    <a href="/"><BiCommentDetail className="m-5" style={{color: 'tan'}} size={32} /></a>
                    <a href="/"><BiBookmarks className="m-5" style={{color: 'tan'}} size={32} /></a>
                    <a href="/"><BiShare className="m-5" style={{color: 'tan'}} size={32} /></a>
                </div>
            </div>
        </div>
    )
}