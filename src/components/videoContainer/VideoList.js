import React, { useContext, useEffect, useState } from "react";
import PostContainer from "./PostContainer";
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import SearchContext from "../../utils/SearchContext";

export default function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosCollection = collection(firestore, "videos");
        const videosSnapshot = await getDocs(videosCollection);
        let videosData = videosSnapshot.docs.map((doc, index) => ({
          id: doc.id ? doc.id : index,
          ...doc.data(),
        }));

        videosData = videosData.sort(() => Math.random() - 0.5);

        setVideos(videosData);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };

    fetchVideos();
  }, []);

  const { matchingVideos } = useContext(SearchContext);

  const videoList = matchingVideos.length > 0 ? matchingVideos : videos;

  return (
    <div className="h-full w-full flex p-4 justify-between items-center">
      <div className="flex  w-full flex-row h-3/4">
        <div className=" h-full rounded-2xl p-2 w-full">
          <div className="app_videos snap-y snap-mandatory h-full w-full relative rounded-2xl overflow-scroll">
            {videoList.map((video) => (
              <PostContainer key={video.id} videoData={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
