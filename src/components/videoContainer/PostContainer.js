import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../utils/AuthContext";
import CommentSection from "./CommentSection";
import Video from "./Video";
import { storage, firestore } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiCommentDetail, BiShare, BiBookmarks } from "react-icons/bi";
import { RiUserFollowLine, RiUserUnfollowFill } from "react-icons/ri";
import {
  doc,
  getDoc,
  runTransaction,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useMediaQuery } from "react-responsive";
import pancakeholder from "../../assets/pancakeholder.svg";

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

export default function PostContainer({ videoData }) {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const [userData, setUserData] = useState(null);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true); // variables for follow buttons
  const [photoURL, setPhotoURL] = useState(pancakeholder)
  const { user, loading } = useContext(AuthContext); // Destructure user and loading from the context

  const uid = user ? user.uid : null; // Get the uid from the user object

  useEffect(() => {
    if (videoData.userId) {
      getUserData(videoData.userId).then(setUserData);
    }
  }, [videoData]);

  useEffect(() => {
    if (userData && userData.photoURL) {
      const photoStorageRef = ref(storage, userData.photoURL);
      getDownloadURL(photoStorageRef)
        .then((url) => {
          setPhotoURL(url);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [userData]);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (videoData.id && uid && !loading) {
        // ensure neither is undefined or loading
        const videoRef = doc(firestore, "videos", videoData.id);
        const likeRef = doc(videoRef, "likes", uid);
        const docSnap = await getDoc(likeRef);

        if (docSnap.exists()) {
          setUserHasLiked(true);
        } else {
          setUserHasLiked(false);
        }
      }
    };

    checkIfLiked();
  }, [videoData, uid, loading]);
  async function likeVideo(videoId, userId) {
    if (videoId && userId && !loading) {
      // ensure neither is undefined or loading
      const videoRef = doc(firestore, "videos", videoId);
      const likeRef = doc(videoRef, "likes", userId);

      if ((await getDoc(likeRef)).exists()) {
        console.log("User has already liked this video.");
        return;
      }

      await setDoc(likeRef, {});

      // Add video reference to the user's liked videos subcollection
      const userRef = doc(firestore, "Users", userId);
      const userLikedVideoRef = doc(userRef, "likedVideos", videoId);
      await setDoc(userLikedVideoRef, {});

      await runTransaction(firestore, async (transaction) => {
        const videoDoc = await transaction.get(videoRef);
        if (!videoDoc.exists()) {
          throw "Document does not exist!";
        }

        const newLikesCount = (videoDoc.data().likes || 0) + 1;
        transaction.update(videoRef, { likes: newLikesCount });
      });

      setUserHasLiked(true); // set userHasLiked to true after a successful like action
    }
  }

  async function unlikeVideo(videoId, userId) {
    if (videoId && userId && !loading) {
      // ensure neither is undefined or loading
      const videoRef = doc(firestore, "videos", videoId);
      const likeRef = doc(videoRef, "likes", userId);

      await deleteDoc(likeRef); // Remove the user's like from the Firestore

      // Remove video reference from the user's liked videos subcollection
      const userRef = doc(firestore, "Users", userId);
      const userLikedVideoRef = doc(userRef, "likedVideos", videoId);
      await deleteDoc(userLikedVideoRef);

      await runTransaction(firestore, async (transaction) => {
        const videoDoc = await transaction.get(videoRef);
        if (!videoDoc.exists()) {
          throw "Document does not exist!";
        }

        const newLikesCount = Math.max((videoDoc.data().likes || 0) - 1, 0); // Ensure likes never go below 0
        transaction.update(videoRef, { likes: newLikesCount });
      });

      setUserHasLiked(false); // set userHasLiked to false after a successful unlike action
    }
  }

  const [showCommentSection, setShowCommentSection] = useState(false);

  const handleCloseCommentSection = () => {
    setShowCommentSection(false);
  };

  const handleCommentBtnClick = () => {
    setShowCommentSection(!showCommentSection);
  };

  // Logic for follow button?//
  const followUser = async () => {
    //Logic for following user
    if (!isFollowing) {
      try {
        const currentUserUid = uid; //pull current user id
        const userToFollowUid = videoData.userId; //based off video data containing the uid

        // Add document in "following" subcollection of the current user.
        const followingRef = doc(firestore, "Users", currentUserUid)
          .collection("following")
          .doc(userToFollowUid);
        await setDoc(followingRef, {});

        // Add document in "followers" subcollection of the user being followed.
        const followersRef = doc(
          firestore,
          "Users",
          userToFollowUid,
          "followers",
          currentUserUid
        );
        await setDoc(followersRef, {});
        setIsFollowing(true); // Update the state to indicate that the user is now being followed.
      } catch (error) {
        console.error(error);
      }
    }
  };

  const unfollowUser = async () => {
    //Logic for unfollowing user
    if (isFollowing) {
      try {
        const currentUserUid = uid; //current users
        const userToFollowUid = videoData.userId; //uses video data's user id

        const followingRef = doc(firestore, "Users", currentUserUid)
          .collection("following")
          .doc(userToFollowUid); //deletes document in the following sub collection
        await deleteDoc(followingRef);

        const followersRef = doc(firestore, "User", userToFollowUid)
          .collection("followers")
          .doc(currentUserUid);
        await deleteDoc(followersRef);
        setIsFollowing(false); //updates to user that is now being unfollowed
      } catch (error) {
        console.error("error unfollowing the user:", error);
      }
    }
  };

  return (
    <div className="flex justify-center flex-row snap start">
      <div className=" h-full rounded-3xl p-5 w-full md:w-3/4 bg-black bg-opacity-40">
        {userData && (
          <div className="username flex-row flex p-5 text-amber-200 text-xl">
            {/* <Link to={`/profile/${userData}`}> */}
            <img
              className=" rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-32 xl:w-32 bg-yellow-500"
              src={photoURL}
              alt={`Profile of User ${userData}`}
            />
            {/* </Link> */}
            <div className="pl-4">
              <p>
                <span className="text-3xl">{userData.firstName}</span> |{" "}
                <span className="font-light text-xl">{userData.devRole}</span>
              </p>
              <p className="pt-2 text-sm md:text-xl">{videoData.title}</p>
            </div>
          </div>
        )}
        <hr className="mt-2 mb-2" />
        <div className="app_videos h-full flex justify-center relative rounded-2xl overflow-scroll min-h-{600}">
          <div className="flex flex-col">
            {userHasLiked ? (
              <AiFillHeart
                className="m-4 hover:cursor-pointer"
                style={{ color: "tan" }}
                size={28}
                onClick={() => {
                  console.log("videoData.id:", videoData.id); // debugging logs
                  console.log("uid:", uid);

                  unlikeVideo(videoData.id, uid); // Call the unlikeVideo function
                }}
              />
            ) : (
              <AiOutlineHeart
                className="m-4 hover:cursor-pointer"
                style={{ color: "tan" }}
                size={28}
                onClick={() => {
                  console.log("videoData.id:", videoData.id); // debugging logs
                  console.log("uid:", uid);

                  likeVideo(videoData.id, uid);
                }}
              />
            )}
            {/* <BiCommentDetail
              className="m-4 hover:cursor-pointer"
              style={{ color: "tan" }}
              size={28}
              onClick={handleCommentBtnClick}
            /> */}
            {/* <BiBookmarks className="m-4" style={{ color: "tan" }} size={28} />
            <BiShare className="m-4" style={{ color: "tan" }} size={28} />

            {isFollowing ? (
              <RiUserFollowLine
                className="m-4 hover:cursor-pointer"
                style={{ color: "tan" }}
                size={28}
                onClick={() => {
                  followUser(); //call the follow user function
                  console.log("User clicked the RiUserFollowLine icon");
                }}
              /> */}
            {/* ) : (
              <RiUserUnfollowFill
                className="m-4 hover:cursor-pointer"
                style={{ color: "tan" }}
                size={28}
                onClick={() => {
                  unfollowUser(); //call the unfollower user function
                  console.log("user clicked unfollow button");
                }}
              />
            )} */}
          </div>
          <Video fullSize={isSmallScreen} videoData={videoData} />
          {showCommentSection && (
            <>
              <CommentSection handleClose={handleCloseCommentSection} />
              {/* fetch comments related to the video post and map them to display in this section. */}
              {/* Add code here to display the list of comments */}
              {/* Add code here to display the form to submit a comment */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
