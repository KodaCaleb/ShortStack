

// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Video from "../components/videoContainer/Video";
import pancakeholder from "../assets/pancakeholder.svg";
import { RiUserFollowFill } from "react-icons/ri";
import { AiFillHeart, AiFillLinkedin, AiFillGithub } from "react-icons/ai";

export default function ViewProfiles() {
  // Define state variables using useState hook
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null);
  const [devRole, setDevRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [userContentData, setUserContentData] = useState([]);
  const [likedVideoData, setLikedVideoData] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true);

  const { userId } = useParams();
  console.log(userId)

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (userId) {
          // Get the user document from Firestore based on the user's ID (userId)
          const userDocRef = doc(firestore, "Users", userId);
          const userDocSnapshot = await getDoc(userDocRef);

          // If the user document exists, extract and set user data and content
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            if (userData) {
              setFirstName(userData.firstName || "");
              setLastName(userData.lastName || "");
              setUsername(userData.userName || "");
              setDevRole(userData.devRole || "");
              setPhoto(userData.photoURL || pancakeholder);
            }

            // Get the userContent collection associated with the user document
            const userContentRef = collection(userDocRef, "userContent");
            const userContentSnapshot = await getDocs(userContentRef);
            // Map the user content data to an array and set the state variable
            const userContentDataArray = userContentSnapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() })
            );
            setUserContentData(userContentDataArray);

            // Fetch liked videos data from the "likedVideos" subcollection
            const likedVideosRef = collection(userDocRef, "likedVideos");
            const likedVideosSnapshot = await getDocs(likedVideosRef);
            const likedVideosDataArray = likedVideosSnapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() })
            );
            setLikedVideoData(likedVideosDataArray);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setLoadingUser(false);
    // Call the function to fetch data for the specified user
    getUserData();
  }, [userId]);
  // Render the JSX for the user profile heading
  return (
    <>
      <div className="flex h-100 flex-col items-center mt-20">
        <div className="fixed h-full rounded-3xl w-full md:w-11/12 bg-black bg-opacity-40 pointer-events-none"></div>
        <div className="flex pl-14 items-center md:flex-row md:w-3/4 m-8">
          <div className="rounded-full relative px-4 max-w-[150px] max-h-[150px] border border-white bg-yellow-400">
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
              <hr className="mt-4 mb-2" />
            </div>
            <div className="flex justify-between">
              <div className="bio-floating relative p-1 text-white">
                <p>
                  <span className="text-2xl">{firstName}</span>{" "}|{" "}
                  <span className="pt-2 text-2xl">{lastName}</span>
                </p>
                <span>{devRole}</span>
              </div>
              <hr className="w-12 translate-y-8 rotate-90" />
              <div className="flex justify-between mt-2">
                <div className="flex mr-10">
                  <RiUserFollowFill style={{ color: "tan" }} size={28} />
                  <p className="ml-3 text-amber-500 text-center">22</p>
                </div>
                <div className="flex mr-10">
                  <AiFillHeart style={{ color: "tan" }} size={28} />
                  <p className="ml-3 text-amber-500 text-center">57</p>
                </div>
                <a href="https://github.com" className="mr-10 hover:amber-500">
                  <AiFillGithub className="github" style={{ color: "tan", cursor: "pointer" }} size={28} />
                </a>
                <a href="https://github.com" className="mr-10 hover:amber-500">
                  <AiFillLinkedin style={{ color: "tan", cursor: "pointer" }} size={28} />
                </a>
              </div>
            </div>
            <div className="justify-start">
              {/* <button
                  className="flex items-center justify-center h-8 px-12 w-50 bg-yellow-500 mt-2 rounded font-semibold text-sm text-black-100 hover:bg-yellow-300 hover:rounded-3xl hover:border-2 hover:border-amber-700"
                  >
                  <RiUserFollowFill className="mr-2" />
                  Follow Me!
                </button> */}
            </div>
          </div>
        </div>
        {loadingUser ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {userContentData.map((content, index) => (
              <div key={index} className="flex flex-row p-20 justify-center">
                <Video
                  videoData={content}
                  
                  fullSize={true}
                  showDeleteButton={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}