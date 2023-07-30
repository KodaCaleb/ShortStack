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
import { MdOutlineExpandCircleDown } from "react-icons/md";

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
    <div
      className="flex justify-center h-screen rounded-2xl">

      {/* Fixed black backdrop */}
      <div className="fixed h-full rounded-3xl w-full md:w-3/4 bg-black bg-opacity-40 pointer-events-none z-5"></div>
      <div
        className="app_videos h-full w-full relative flex flex-col rounded-2xl overflow-scroll"
      >
        {videoList.map((video) => (
          <PostContainer key={video.id} videoData={video} />
        ))}
        <div className="flex justify-center z-10">

          <button
            className="text-yellow-800 mb-5 w-fit hover:text-yellow-500"
            onClick={() => {
              fetchVideos(lastDoc);
              window.scrollTo(0, 0);
            }}
          >
            Want a
            <br></br>
            Bigger Stack?
            <MdOutlineExpandCircleDown
              size={120}
              style={{ color: "tan" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
