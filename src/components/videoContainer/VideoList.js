import React, { useContext, useEffect, useState } from "react";
import PostContainer from "./PostContainer";
import { firestore } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import SearchContext from "../../utils/searchLogic/SearchContext";

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  const fetchVideos = async (afterDoc) => {
    try {
      let videosQuery = query(
        collection(firestore, "videos"),
        orderBy("createdAt"),
        limit(10)
      );
      if (afterDoc) {
        videosQuery = query(
          collection(firestore, "videos"),
          orderBy("createdAt"),
          startAfter(afterDoc),
          limit(10)
        );
      }
      const videosSnapshot = await getDocs(videosQuery);
      let videosData = videosSnapshot.docs.map((doc, index) => {
        const id = doc.id ? doc.id : index;
        return {
          id,
          ...doc.data(),
        };
      });

      setLastDoc(videosSnapshot.docs[videosSnapshot.docs.length - 1]);

      setVideos(videosData);
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const { matchingVideos } = useContext(SearchContext);

  const videoList = matchingVideos.length > 0 ? matchingVideos : videos;

  return (
    <div className="fixed h-full w-full flex justify-between items-center">
      <div className="flex w-full flex-row h-3/4">
        <div className=" h-screen rounded-2xl p-2 w-full">
          <div className="app_videos h-full w-full relative rounded-2xl overflow-scroll">
            {videoList.map((video) => (
              <PostContainer key={video.id} videoData={video} />
            ))}
            <button
              className="bg-white w-full"
              onClick={() => {
                fetchVideos(lastDoc);
                window.scrollTo(0, 0);
              }}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
