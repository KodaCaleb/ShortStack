import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../utils/AuthContext";
import Video from "./Video";
import { storage, firestore } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { RiUserFollowLine, RiUserUnfollowFill } from "react-icons/ri";
import { doc, getDoc, runTransaction, setDoc, deleteDoc, collection } from "firebase/firestore";
import { useMediaQuery } from "react-responsive";
import pancakeholder from "../../assets/pancakeholder.svg";
// import { BiCommentDetail, BiShare, BiBookmarks } from "react-icons/bi";
// import CommentSection from "./CommentSection";
// import { BiCommentDetail, BiShare, BiBookmarks } from "react-icons/bi";
// import ViewProfiles from "../../pages/ViewProfiles";

// Function to get user data from Firestore based on the userId
async function getUserData(userId) {
  const docRef = doc(firestore, "Users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const userData = docSnap.data();
    return userData;
  } else {
    console.error("No such document!");
    return null;
  };
};

export default function PostContainer({ videoData }) {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const [userData, setUserData] = useState(null);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(videoData.likes || null);
  const [isFollowing, setIsFollowing] = useState(false); // variables for follow buttons
  const [photoURL, setPhotoURL] = useState(pancakeholder);
  const { user, loading } = useContext(AuthContext);
  const uid = user ? user.uid : null;

  // Fetch user data for the user who posted the video when the component mounts or when the videoData changes
  useEffect(() => {
    if (videoData.userId) {
      getUserData(videoData.userId).then(setUserData);
    };
  }, [videoData]);

  // Fetch the user's profile photo when the userData changes
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
    };
  }, [userData]);

  // Check if the user has already liked the video when the component mounts or when the dependencies change
  useEffect(() => {
    const checkIfLiked = async () => {
      if (videoData.id && uid && !loading) {
        const videoRef = doc(firestore, "videos", videoData.id);
        const likeRef = doc(videoRef, "likes", uid);
        const likeData = await getDoc(likeRef);

        // If a document exists in the 'likes' subcollection for the current user and the video, the user has liked the video
        if (likeData.exists()) {
          setUserHasLiked(true);
        } else {
          setUserHasLiked(false);
        };
      };
    };
    const checkIfFollowed = async () => {
      if (videoData.userId && uid && !loading) {
        const userFollowingRef = collection(firestore, "Users", uid, "following");
        const followedUserDocRef = await doc(userFollowingRef, videoData.userId);
        const followingData = await getDoc(followedUserDocRef);
        console.log("follow reference found:", followingData);

        if (followingData.exists()) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        };
      };
    };

    checkIfLiked();
    checkIfFollowed();
  }, [videoData.id, videoData.userId, uid, loading]);

  // Log the isFollowing state whenever it changes
  useEffect(() => {
    console.log("followed state status", isFollowing);
  }, [isFollowing]);

  // Function to handle liking a video
  async function likeVideo(videoId, userId) {
    if (videoId && userId && !loading) {
      const videoRef = doc(firestore, "videos", videoId);
      const likeRef = doc(videoRef, "likes", userId);

      // Check if the user has already liked the video
      if ((await getDoc(likeRef)).exists()) {
        console.log("User has already liked this video.");
        return;
      };

      // Add a document in the 'likes' subcollection to represent the user's like
      await setDoc(likeRef, {});
      const userRef = doc(firestore, "Users", userId);
      const userLikedVideoRef = doc(userRef, "likedVideos", videoId);
      await setDoc(userLikedVideoRef, {});

      // Use a Firestore transaction to update the 'likes' count of the video
      await runTransaction(firestore, async (transaction) => {
        const videoDoc = await transaction.get(videoRef);
        if (!videoDoc.exists()) {
          throw console.error("Document does not exist!");
        };

        // Calculate the new likes count and update the 'likes' field in the video document
        const newLikesCount = (videoDoc.data().likes || 0) + 1;
        transaction.update(videoRef, { likes: newLikesCount });
        updateLikes(newLikesCount);
      });

      setUserHasLiked(true);
    };
  };

  // Function to handle unliking a video
  async function unlikeVideo(videoId, userId) {
    if (videoId && userId && !loading) {
      const videoRef = doc(firestore, "videos", videoId);
      const likeRef = doc(videoRef, "likes", userId);

      // Delete the document representing the user's like from the 'likes' subcollection
      await deleteDoc(likeRef);

      // Delete the reference to the liked video from the user's 'likedVideos' subcollection
      const userRef = doc(firestore, "Users", userId);
      const userLikedVideoRef = doc(userRef, "likedVideos", videoId);
      await deleteDoc(userLikedVideoRef);

      // Use a Firestore transaction to update the 'likes' count of the video
      await runTransaction(firestore, async (transaction) => {
        const videoDoc = await transaction.get(videoRef);
        if (!videoDoc.exists()) {
          console.error("Document does not exist!");
        };

        // Calculate the new likes count, ensuring likes never go below 0, and update the 'likes' field in the video document
        const newLikesCount = Math.max((videoDoc.data().likes || 0) - 1, 0); // Ensure likes never go below 0
        transaction.update(videoRef, { likes: newLikesCount });
        updateLikes(newLikesCount);
      });

      setUserHasLiked(false);
    };
  };

  // Function to update the likes count state
  async function updateLikes(count) {
    setLikesCount(count);
  };

  // Function to handle following a user
  async function followUser(postedUserId) {
    if (postedUserId && uid && !loading) {
      // Add to current user's following collection
      const userFollowingRef = doc(firestore, "Users", uid, "following", postedUserId);
      await setDoc(userFollowingRef, {});

      // Add to posted user's followers collection
      const postedUserFollowerRef = doc(firestore, "Users", postedUserId, "followers", uid);
      await setDoc(postedUserFollowerRef, {});

      setIsFollowing(true);
    };
  };

  // Function to handle unfollowing a user
  async function unfollowUser(postedUserId) {
    if (postedUserId && uid && !loading) {
      // Remove from current user's following collection
      const userFollowingRef = doc(firestore, "Users", uid, "following", postedUserId);
      await deleteDoc(userFollowingRef);

      // Remove from posted user's followers collection
      const postedUserFollowerRef = doc(firestore, "Users", postedUserId, "followers", uid);
      await deleteDoc(postedUserFollowerRef);
      
      setIsFollowing(false);
      console.log(`Unfollowed user with ID ${postedUserId}`);
    };
  };

  return (
    <>
      <div className="flex justify-center flex-row mt-20">
        {/* Post Container */}
        <div className="z-8 h-full rounded-3xl mb-64 w-full md:w-3/4">
          {/* Header Container */}
          {userData && (
            <div className="flex justify-center username header-container w-fullp-2 text-amber-200 z-10 text-xl">
              <div id="photo-link" className="mr-4">
                <Link to={"/viewprofiles"}>
                  <img
                    className="rounded-full h-20 mr-2 bg-yellow-500"
                    src={photoURL}
                    alt={"post creator"}
                  />
                </Link>
              </div>
              <div className="header-info pl-4">
                <p>
                  <span className="name text-2xl">{userData.displayName}</span> |{" "}
                  <span className="dev-role font-light text-sm">{userData.devRole}</span>
                </p>
                <span className="vid-title pt-2 text-sm md:text-md">{videoData.title}</span>
                <p className="tags">
                  <span className="pt-2 text-sm md:text-md">{videoData.tags.value ? `|` + videoData.tags : ''}</span>
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <hr className="divider mt-2 mb-2 w-3/4" />
          </div>
          {/* Icons and Video Container */}
          <div className="app_videos h-fit flex justify-center relative rounded-2xl overflow-scroll min-h-{600}">
            <div className="flex flex-col icons-container">
              <div classNames="flex flex-col items-center">
                {/* Heart Icon */}
                {userHasLiked ? (
                  <button className="icons mt-3 mr-2 hover:cursor-pointer">
                    <AiFillHeart
                      style={{ color: "tan" }}
                      size={28}
                      onClick={() => {
                        unlikeVideo(videoData.id, uid); // Call the unlikeVideo function
                      }}
                    />
                  </button>
                ) : (
                  <button className="icons mt-3 mr-2 hover:cursor-pointer">
                    <AiOutlineHeart
                      style={{ color: "tan" }}
                      size={28}
                      onClick={() => {
                        likeVideo(videoData.id, uid);
                      }}
                    />
                  </button>
                )}
                <div className="text-orange-200 text-center mr-2">{likesCount}</div>
              </div>
              {/* Comment Icon */}
              {/* <BiCommentDetail
              className="icons m-4 hover:cursor-pointer"
              style={{ color: "tan" }}
              size={28}
              onClick={handleCommentBtnClick}
            />
            {showCommentSection && (
                <>
                  <CommentSection handleClose={handleCloseCommentSection} />
                  {/* fetch comments related to the video post and map them to display in this section. */}
              {/* Add code here to display the list of comments */}
              {/* Add code here to display the form to submit a comment */}
              {/* </> */}
              {/* )} */}
              {/* Bookmark Icon */}
              {/* <BiBookmarks className="icons m-4" style={{ color: "tan" }} size={28} /> */}
              {/* Share Icon */}
              {/* <BiShare className="icons m-4" style={{ color: "tan" }} size={28} /> */}
              {/* Follow Icon */}
              {isFollowing ? (
                <button className="icons mt-5 mr-2 hover:cursor-pointer">
                  <RiUserUnfollowFill
                    style={{ color: "tan" }}
                    size={28}
                    onClick={() => {
                      unfollowUser(videoData.userId); // call the unfollow user function
                    }}
                  />
                </button>
              ) : (
                <button className="icons mt-5 mr-2 hover:cursor-pointer">
                  <RiUserFollowLine
                    style={{ color: "tan" }}
                    size={28}
                    onClick={() => {
                      followUser(videoData.userId); // call the follow user function
                    }}
                  />
                </button>
              )}
            </div>
            <Video fullSize={isSmallScreen} videoData={videoData} />
            {/* {showCommentSection && (
              <>
                <CommentSection handleClose={handleCloseCommentSection} /> */}
            {/* fetch comments related to the video post and map them to display in this section. */}
            {/* Add code here to display the list of comments */}
            {/* Add code here to display the form to submit a comment */}
            {/* </> */}
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
};
