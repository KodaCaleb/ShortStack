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
    <div className="h-screen w-full flex p-4 justify-center items-center">
      <div className="flex  w-full flex-row h-3/4">
        <div className=" h-full rounded-2xl p-2 w-full">
          <div className="app_videos snap-y snap-mandatory h-full w-full relative rounded-2xl overflow-scroll">
            {videos.map((video) => (
              <PostContainer key={video.id} videoData={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

