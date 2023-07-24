import React, { useEffect, useState, useContext } from "react";
import Video from "./Video";
import CommentSection from "./CommentSection";
import { firestore } from "../../firebase";
import {
  doc,
  getDoc,
  runTransaction,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiCommentDetail, BiShare, BiBookmarks } from "react-icons/bi";
import AuthContext from "../../utils/AuthContext";
import { RiUserFollowLine, RiUserUnfollowFill } from "react-icons/ri";

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
  const [userData, setUserData] = useState(null);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // variables for follow buttons

  const { user, loading } = useContext(AuthContext); // Destructure user and loading from the context

  const uid = user ? user.uid : null; // Get the uid from the user object

  useEffect(() => {
    if (videoData.userId) {
      getUserData(videoData.userId).then(setUserData);
    }
  }, [videoData]);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (videoData.id && uid && !loading) { // ensure neither is undefined or loading
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
    if (videoId && userId && !loading) { // ensure neither is undefined or loading
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
    if (videoId && userId && !loading) { // ensure neither is undefined or loading
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
  async function handleCommentBtnClick() {
    // fetch comments for video 
    // post comments for video
  }

  // Logic for follow button?//
    const followUser= async () => {
      //Logic for following user
      if(!isFollowing) {
        try {
          const currentUserUid = ''; //pull current user id
          const userToFollowUid = videoData.userId; //based off video data containing the uid

           // Add document in "following" subcollection of the current user.
        const followingRef = doc(firestore, 'Users', currentUserUid, 'following', userToFollowUid);
        await setDoc(followingRef, {});

           // Add document in "followers" subcollection of the user being followed.
           const followersRef = doc(firestore, 'Users', userToFollowUid, 'followers', currentUserUid);
           await setDoc(followersRef, {});
           setIsFollowing(true); // Update the state to indicate that the user is now being followed.
          } catch (error) {
            console.error('Error following the user:', error);
          }
        }
      };

  const unfollowUser = async () => {
    //Logic for unfollowing user
    if(isFollowing){
      try {
        const currentUserUid = uid; //current users
        const userToFollowUid = videoDate.userId;

        const followingRef = doc(firestore, 'Users', currentUserUid, 'following', UserToFollowUid);
        await deleteDoc(followingRef);

        const followersRef = doc(firestore, 'User', userToFollowUid, 'followers', currentUserUid);
        await deleteDoc(followersRef);
        setIsFollowing(false); //updates to user that is now being unfollowed
      } catch (error) {
        console.error('error unfollowing the user:', error);
      }
      }
    }
  };


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
            {userHasLiked ? (
              <AiFillHeart
                className="m-4 hover:cursor-pointer"
                style={{ color: "tan" }}
                size={28}
                onClick={() => {
                  console.log('videoData.id:', videoData.id); // debugging logs
                  console.log('uid:', uid);
                  unlikeVideo(videoData.id, uid); // Call the unlikeVideo function
                }}
              />
            ) : (
              <AiOutlineHeart
                className="m-4 hover:cursor-pointer"
                style={{ color: "tan" }}
                size={28}
                onClick={() => {
                  console.log('videoData.id:', videoData.id); // debugging logs
                  console.log('uid:', uid);
                  likeVideo(videoData.id, uid);
                }}
              />
            )}
            <BiCommentDetail
              className="m-4 hover:cursor-pointer"
              style={{ color: "tan" }}
              size={28}
              onClick={() => {
                setShowCommentSection(!showCommentSection);
              }}
            />
            <BiBookmarks className="m-4" style={{ color: "tan" }} size={28} />
            <BiShare className="m-4" style={{ color: "tan" }} size={28} />

            {/* {isFollowing ? ()} */}
            <RiUserFollowLine className="m-4 hover:cursor-pointer"
              style={{ color: "tan" }}
              size={28}
              onClick={() => {
                ;
                console.log("User clicked the RiUserFollowLine icon");
              }}
            />
            {/* UNFOLLOW BUTTON */}
            {/* ) : ( 
              <RiUserUnfollowFill
            className="m-4 hover:cursor-pointer"
            style={{ color: "tan" }}
            size={28}
            onClick={() => {
            }}
              />   */}
          </div>
        </div>
        {showCommentSection && (
          <>
            <CommentSection />
            {/* fetch comments related to the video post and map them to display in this  section. */}
            {/* Add code here to display the list of comments */}
            {/* Add code here to display the form to submit a comment */}
          </>
        )}
      </div>
    </div>
  );
}
