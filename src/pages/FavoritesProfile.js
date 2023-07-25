import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { doc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { RiUserFollowLine } from 'react-icons/ri'
import AuthContext from "../utils/AuthContext";
import Video from "../components/videoContainer/Video";

export default function FavoritesProfile(videoData) {
  const [devRole, setDevRole] = useState("");
  const [userContentData, setUserContentData] = useState([]);
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const { loading, user } = useContext(AuthContext);


  const { userId } = useParams();

  useEffect(() => {
    const getUserData = async (userId) => {
      try {
        const userDocRef = doc(firestore, "Users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          console.log("Over Here!", userData);
          setDevRole(userData.devRole || "");
          setUsername(userData.displayName || ""); // Assuming displayName is available in the user data
          setPhoto(userData.photoURL || process.env.PUBLIC_URL + "/pancakeholder.img.png");

          const userContentRef = collection(userDocRef, "userContent");
          const userContentSnapshot = await getDocs(userContentRef);

          const userContentDataArray = userContentSnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() })
          );
          setUserContentData(userContentDataArray);
        }
      } catch (error) {
        alert("Error fetching data from firestore:", error);
      }
      setLoadingUser(false);
    };

    getUserData(userId);
  }, [userId]);

  return (
    <div className="flex h-100 flex-col items-center">
      <div className="flex justify-center md:flex-row mx-4 md:w-1/2 m-20">
        {/* ...Your existing JSX... */}
        <div className="self-start rounded-full relative flex items-center justify-center px-4 max-w-[150px] max-h-[150px] border border-white bg-yellow-400">
          <img
            src={photo}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col justify-start px-4 md:pl-4 w-full">
          {/* stack of username and bio */}
          <div className="username-floating relative text-white">
            <span className="text-5xl text-amber-300">{username}</span>
          </div>
          <div className="bio-floating relative p-1 text-white">
            <span>{devRole}</span>
          </div>
          <div className="justify-start">
            <button
              className="flex items-center justify-center h-8 px-12 w-50 bg-yellow-500 mt-2 rounded font-semibold text-sm text-black-100 hover:bg-yellow-300 hover:rounded-3xl hover:border-2 hover:border-amber-700"
            >
              <RiUserFollowLine className="mr-2" />
              Follow Me!
            </button>
          </div>
        </div>
      </div>
    <div>
      {loadingUser ? (
        <div>Loading...</div>
      ) : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {userContentData.map((content, index) => (
          <div key={index} className="flex flex-row p-20 justify-center">
            <Video videoData={content} fullSize={true} />
          </div>
        ))}
      </div>
      )}
    </div>
  </div>
  )
}
