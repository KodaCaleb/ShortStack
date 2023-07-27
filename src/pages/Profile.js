import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../utils/AuthContext";
import { firestore } from "../firebase";
import { doc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import Video from "../components/videoContainer/Video";
import { RiUserFollowLine } from 'react-icons/ri'

export default function UserProfileHeading() {
  const [devRole, setDevRole] = useState("");
  const [userContentData, setUserContentData] = useState([]);
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBlurBackground, setBlurBackground] = useState(false);

  const { user, loading, userData } = useContext(AuthContext);

  const uid = user ? user.uid : null;
  
  useEffect(() => {
    if (user && uid && !loading) {
      const getUserData = async () => {
        try {
          const userDocRef = doc(firestore, "Users", uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();

            console.log("userData:", userData);

            setDevRole(userData.devRole || "");

            const userContentRef = collection(userDocRef, "userContent");
            const userContentSnapshot = await getDocs(userContentRef);

            const userContentDataArray = userContentSnapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() })
            );
            setUserContentData(userContentDataArray);
          }
        } catch (error) {
          console.log("Error fetching data from firestore:", error);
        }
      };

      getUserData();
      setUsername(user.displayName || "");
      setPhoto(
        userData.photoURL || process.env.PUBLIC_URL + "/pancakeholder.img.png"
      );
      setLoadingUser(false);
    }
  }, [user, uid, loading]);


  const openModal = () => {
    setModalOpen(true);
    setBlurBackground(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setBlurBackground(false);
  };

  const deleteVideo = async (videoId) => {
    try {
      const videoDocRef = doc(firestore, "Users", uid, "userContent", videoId);
      await deleteDoc(videoDocRef);

      const mainVideoDocRef = doc(firestore, "videos", videoId);
      await deleteDoc(mainVideoDocRef);

      setUserContentData((prev) => prev.filter(video => video.id !== videoId));
    } catch (error) {
      console.log("Error deleting video:", error);
    }
  };

  return (
    <>
      <div
        className={`main-container${isBlurBackground ? " blur-background" : ""
          }`}
      >
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

          {loadingUser ? (
            <div>Loading...</div>
          ) : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {userContentData.map((content, index) => (
              <div key={index}  className="flex flex-row p-20 justify-center">
                <Video videoData={content} fullSize={true} deleteVideo={deleteVideo} showDeleteButton={true}  />
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </>
  );
}
