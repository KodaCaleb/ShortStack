
// Import necessary modules and components
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../utils/AuthContext";
import { firestore, storage } from "../firebase";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Video from "../components/videoContainer/Video";
import pancakeholder from "../assets/pancakeholder.svg";

// Future Development Code
// import { RiUserFollowFill } from "react-icons/ri";
// import { AiFillHeart, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
// import { RiUserFollowLine } from 'react-icons/ri';

// Component that represents the user profile heading
export default function UserProfileHeading() {

  // Extract user, loading, and userData from AuthContext using useContext hook
  const { loading, userData, currentUser } = useContext(AuthContext);

  // Define state variables for profile data
  const [devRole, setDevRole] = useState("");
  const [photo, setPhoto] = useState(pancakeholder);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userContentData, setUserContentData] = useState([]);

  // Function to delete a video from Firestore and update the state accordingly
  const deleteVideo = async (videoId, vidRef) => {
    try {
      // Delete the user-specific video reference
      const videoDocRef = doc(firestore, "Users", currentUser, "userContent", videoId);
      await deleteDoc(videoDocRef);

      // Delete the main video document from the "videos" collection
      const mainVideoDocRef = doc(firestore, "videos", videoId);
      await deleteDoc(mainVideoDocRef);

      // Delete the video from Firebase Storage
      const storageRef = ref(storage, vidRef);
      await deleteObject(storageRef);

      // Update the userContentData state to remove the deleted video
      setUserContentData((prev) =>
        prev.filter((video) => video.id !== videoId)
      );
    } catch (error) {
      console.log("Error deleting video:", error);
    }
  };

  // useEffect hook to fetch user data and content from Firestore
  useEffect(() => {
    if (currentUser && userData && !loading) {
      setDevRole(userData.devRole || "");
      setPhoto(userData.photoURL || pancakeholder);
      setUsername(userData.displayName || "")
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");

      try {
        const getUserContentData = async () => {

          const userDocRef = collection(
            firestore,
            "Users",
            currentUser.uid,
            "userContent"
          );

          const userContentSnapshot = await getDocs(userDocRef);

          // Map the user content data to an array and set the state variable
          const userContentDataArray = userContentSnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() })
          );

          setUserContentData(userContentDataArray);
        };

        getUserContentData();
      } catch (error) {
        alert(error);
      }
    }
  }, [currentUser, userData, loading]);

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
                  <span className="pt-2 text-xl">{lastName}</span>
                </p>
                <span>{devRole}</span>
              </div>
              {/* <hr className="w-12 translate-y-8 rotate-90" /> */}
              <div className="flex justify-between mt-2">
                {/* <div className="flex mr-10">
                  <RiUserFollowFill style={{ color: "tan" }} size={28} />
                  <p className="ml-3 text-amber-500 text-center">22</p>
                </div> */}
                {/* <div className="flex mr-10">
                  <AiFillHeart style={{ color: "tan" }} size={28} />
                  <p className="ml-3 text-amber-500 text-center">57</p>
                </div> */}
                {/* <a href="https://github.com" className="mr-10 hover:amber-500">
                  <AiFillGithub className="github" style={{ color: "tan", cursor: "pointer" }} size={28} />
                </a>
                <a href="https://github.com" className="mr-10 hover:amber-500">
                  <AiFillLinkedin style={{ color: "tan", cursor: "pointer" }} size={28} />
                </a> */}
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
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {userContentData.map((content, index) => (
              <div key={index} className="flex flex-row p-20 justify-center">
                <Video
                  videoData={content}
                  fullSize={true}
                  deleteVideo={() => deleteVideo(content.id, content.vidRef)}
                  showDeleteButton={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
