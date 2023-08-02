// Import necessary modules and components
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../utils/AuthContext";
import { firestore, storage } from "../firebase";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Video from "../components/videoContainer/Video";
import pancakeholder from "../assets/pancakeholder.svg";
import { RiUserFollowFill } from "react-icons/ri";
import { AiFillHeart, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { ImProfile } from "react-icons/im";

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
  const [portfolio, setPortfolio] = useState("");
  const [gitHub, setGitHub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [userContentData, setUserContentData] = useState([]);

  useEffect(() => {
    if (currentUser && !loading) {
      const getTotalLikes = async () => {
        try {
          const userVideoSnapshot = await getDocs(
            collection(firestore, "Users", currentUser.uid, "userContent")
          );
          let totalLikes = 0;

          userVideoSnapshot.docs.forEach((videoDoc) => {
            const videoData = videoDoc.data();
            if (videoData.likes && typeof videoData.likes === 'number') {
              totalLikes += videoData.likes;
            };
          });

          setTotalLikes(totalLikes);
        } catch (error) {
          console.error(error);
        }
      };
      getTotalLikes();
    };
  }, [currentUser, loading]);
  // useEffect hook to fetch total followers for the user from Firestore
  useEffect(() => {
    if (currentUser && !loading) {
      const getAllFollowers = async () => {
        try {
          const userFollowerSnapshot = await getDocs(
            collection(firestore, "Users", currentUser.uid, "followers")
          );

          const followersCount = userFollowerSnapshot.size;

          setTotalFollowers(followersCount);
        } catch (error) {
          console.error(error);
        }
      };
      getAllFollowers();
    };
  }, [currentUser, loading]);

  // Function to delete a video from Firestore and update the state accordingly
  const deleteVideo = async (videoId, vidRef) => {
    try {
      // Delete the user-specific video reference
      const videoDocRef = doc(
        firestore,
        "Users",
        currentUser.uid,
        "userContent",
        videoId
      );
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
      console.error("Error deleting video:", error);
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
      setPortfolio(userData.portfolio || "");
      setGitHub(userData.gitHub || "");
      setLinkedIn(userData.linkedIn || "");

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
    };
  }, [currentUser, userData, loading]);

  return (
    <>
      <div className="flex h-100 flex-col items-center mt-20">
        <div className="flex justify-center p-2 w-screen notebk:mb-5">
          <div className="flex flex-col w-screen">
            <div className="flex flex-wrap justify-center">
              <div className="
              profile-image 
              flex self-center 
              rounded-full 
              px-3 
              mx-10
              my-2
              border 
              border-white 
              bg-yellow-400 
              galS8:mx-14 
              ipnSE:mx-28
              surfDuo:w-1/4 surfDuo:mx-0
              notebk:w-1/6"
              >
                <img
                  src={photo}
                  alt="Profile"
                  className="w-7/8 h-full object-cover rounded-full"
                />
              </div>
              <div className="flex justify-evenly galTab:w-2/3">
                <div className="flex flex-col justify-evenly text-center">
                  {/* stack of username and bio */}
                  <div className="username-floating text-white">
                    <span className="profile-username text-amber-300 text-lg galTab:text-4xl notebk:text-5xl">{username}</span>
                  </div>
                  <div className="bio-floating flex flex-wrap justify-center items-center p-1 text-white">
                    <p className="profile-name text-sm galTab:text-3xl">
                      <span >{firstName}</span>{" "}
                      <span className="pt-2">{lastName}{" "}|</span>
                    </p>
                    <span className="profile-devrole text-xs galTab:text-xl">{devRole}</span>
                  </div>
                  <div className="flex justify-center">
                    <hr className="w-11/12 ipadAir:w-full ipadAir:ml-3" />
                  </div>
                  <div className="flex mt-2 justify-evenly">
                    <div className="flex flex-col items-center mr-5">
                      <RiUserFollowFill style={{ color: "tan" }} size={28} />
                      <p className="text-amber-500 text-center">{totalFollowers}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <AiFillHeart style={{ color: "tan" }} size={28} />
                      <p className="text-amber-500 text-center">{totalLikes}</p>
                    </div>
                    <hr className="w-10 translate-y-5 rotate-90" />
                    <a href={gitHub} className="hover:amber-500">
                      <AiFillGithub className="github" style={{ color: "tan", cursor: "pointer" }} size={28} />
                    </a>
                    <a href={linkedIn} className="hover:amber-500">
                      <AiFillLinkedin style={{ color: "tan", cursor: "pointer" }} size={28} />
                    </a>
                    <a href={portfolio} className="hover:amber-500">
                      <ImProfile style={{ color: "tan", cursor: "pointer" }} size={28} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="
          user-content 
          grid grid-cols-2 gap-4
          p-2
          m-4
          surfDuo:grid-cols-3 
          notebk:grid-cols-3 
          notebk:gap-40
          notebk:mx-16">
            {userContentData.map((content, index) => (
              <div key={index} className="">
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
};
