import React, { useEffect,useState } from "react";
import PostContainer from "./PostContainer";
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosCollection = collection(firestore, "videos");
        const videosSnapshot = await getDocs(videosCollection);
        const videosData = videosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videosData);
        console.log("LOOK HERE", videosData);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="h-screen w-full border-4 border-red-600 flex p-4 justify-center items-center">
      <div className="flex  w-full flex-row border-4 border-yellow-300 h-3/4">
        <div className=" h-full rounded-2xl p-2 w-full border-4 border-cyan-200">
          <div className="app_videos h-full w-full relative rounded-2xl overflow-scroll border-4 border-indigo-400">
            {videos.map((video) => (
              <PostContainer key={video.id} videoData={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

