// Import necessary modules and components
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../utils/AuthContext";
import { firestore, storage } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Video from "../components/videoContainer/Video";
import pancakeholder from "../assets/pancakeholder.svg";
import { RiUserFollowFill } from "react-icons/ri";
import { AiFillHeart, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { ImProfile } from "react-icons/im";

export default function ViewProfiles() {
  const { loading } = useContext(AuthContext);

  // Define state variables using useState hook
  const [userData, setUserData] = useState("")
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
    const userId = localStorage.getItem("clickedUserId");
    const getTotalLikes = async (userId) => {
      try {
        if (userId && !loading) {
          const userDocRef = doc(firestore, "Users", userId);
          // Get the userContent collection associated with the user document
          const userContentRef = collection(userDocRef, "userContent");
          const userContentSnapshot = await getDocs(userContentRef);
          let totalLikes = 0;
          userContentSnapshot.docs.forEach((videoDoc) => {
            const videoData = videoDoc.data();
            if (videoData.likes && typeof videoData.likes === "number") {
              totalLikes += videoData.likes;
            }
          });

          setTotalLikes(totalLikes);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Call the function to fetch total likes for the specified user
    getTotalLikes(userId);
  }, [loading]);

  // useEffect hook to fetch total followers for the user from Firestore
  useEffect(() => {
    const userId = localStorage.getItem("clickedUserId");
    const getAllFollowers = async () => {
      try {
        if (userId && !loading) {
          const userFollowerSnapshot = await getDocs(
            collection(firestore, "Users", userId, "followers")
          );

          const followersCount = userFollowerSnapshot.size;

          setTotalFollowers(followersCount);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAllFollowers(userId);
  }, [loading]);

  useEffect(() => {
    const userId = localStorage.getItem("clickedUserId");

    const getUserData = async (userId) => {
      try {
        if (userId) {
          // Get the user document from Firestore based on the user's ID (userId)
          const userDocRef = doc(firestore, "Users", userId);
          const userDocSnapshot = await getDoc(userDocRef);

          // If the user document exists, extract and set user data and content
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            if (userData) {
              setDevRole(userData.devRole || "");
              setPhoto(userData.photoURL || pancakeholder);
              setUsername(userData.displayName || "")
              setFirstName(userData.firstName || "");
              setLastName(userData.lastName || "");
              setPortfolio(userData.portfolio || "");
              setGitHub(userData.gitHub || "");
              setLinkedIn(userData.linkedIn || "");
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
            // setLikedVideoData(likedVideosDataArray);
            setUserData(userData)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Call the function to fetch data for the specified user
    getUserData(userId);
  }, []);
  // Render the JSX for the user profile heading

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
                <div key={index}>
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
      );
    };