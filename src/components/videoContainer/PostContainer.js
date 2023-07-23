import React, { useEffect, useState, useContext } from "react";
import Video from "./Video";
import AuthContext from "../../utils/AuthContext"; // Import your AuthContext here
import { firestore } from "../../firebase";
import {
  doc,
  getDoc,
  runTransaction,
  setDoc,
} from "firebase/firestore";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail, BiShare, BiBookmarks } from "react-icons/bi";

async function getUserData(userId) {
  const docRef = doc(firestore, "Users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
}

async function likeVideo(videoId, userId) {
  const videoRef = doc(firestore, "videos", videoId);
  const likeRef = doc(videoRef, "likes", userId);

  if ((await getDoc(likeRef)).exists()) {
    console.log("User has already liked this video.");
    return;
  }

  await setDoc(likeRef, {});

  await runTransaction(firestore, async (transaction) => {
    const videoDoc = await transaction.get(videoRef);
    if (!videoDoc.exists()) {
      throw "Document does not exist!";
    }

    const newLikesCount = (videoDoc.data().likes || 0) + 1;
    transaction.update(videoRef, { likes: newLikesCount });
  });
}

export default function PostContainer({ videoData }) {
  const { uid } = useContext(AuthContext); // Use the context to get the current user's uid
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (videoData.userId) {
      getUserData(videoData.userId).then(setUserData);
    }
  }, [videoData]);

  return (
    <div className="flex justify-center flex-row snap start">
      <div className=" h-full rounded-3xl p-5 w-3/4 bg-black bg-opacity-40">
        {userData && (
          <div className="username pt-20 text-amber-200 text-xl">
            <p>
              {userData.firstName} | {userData.bio}
            </p>
            <p>{videoData.title}</p>
          </div>
        )}
        <hr className="mt-2 mb-2" />
        <div className="app_videos h-full flex justify-center relative rounded-2xl overflow-scroll">
          <Video videoData={videoData} />
          <div className="flex flex-col-reverse">
            <AiOutlineHeart
              className="m-4 hover:cursor-pointer"
              style={{ color: "tan" }}
              size={28}
              onClick={() => likeVideo(videoData.id, uid)} // Use the uid here
            />
            <BiCommentDetail
              className="m-4"
              style={{ color: "tan" }}
              size={28}
            />
            <BiBookmarks className="m-4" style={{ color: "tan" }} size={28} />
            <BiShare className="m-4" style={{ color: "tan" }} size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}
