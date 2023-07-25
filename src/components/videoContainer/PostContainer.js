import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../utils/AuthContext";
import CommentSection from "./CommentSection";
import Video from "./Video";
import { storage, firestore } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiCommentDetail, BiShare, BiBookmarks } from "react-icons/bi";
import { RiUserFollowLine, RiUserUnfollowFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { doc, getDoc, runTransaction, 
        setDoc, collection, addDoc, deleteDoc,
      } from "firebase/firestore";

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
  const [isFollowing, setIsFollowing] = useState(true); // variables for follow buttons
  const [photoURL, setPhotoURL] = useState(process.env.PUBLIC_URL + "/pancakeholder.img.png")
  const { user, loading } = useContext(AuthContext); // Destructure user and loading from the context

  const uid = user ? user.uid : null; // Get the uid from the user object

  useEffect(() => {
    if (videoData.userId) {
      getUserData(videoData.userId)
      .then(setUserData);
    }
  }, [videoData]);
  
  useEffect(() => {
    if(userData && userData.photoURL) {
      const photoStorageRef = ref(storage, userData.photoURL);
      getDownloadURL(photoStorageRef)
      .then((url) =>{
        setPhotoURL(url)
      })
      .catch((error) => {
        alert(error);
      });
    };
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
      const videoRef = doc(firestore, "videos", videoId);
      const userRef = doc(firestore, "Users", userId);
      const userContentRef = doc(firestore, `Users/${userId}/userContent`, videoId);
      await runTransaction(firestore, async (transaction) => {
        const videoDoc = await transaction.get(videoRef);
        const userDoc = await transaction.get(userRef);
        const userContentDoc = await transaction.get(userContentRef);
        if (!videoDoc.exists() || !userDoc.exists() || !userContentDoc.exists()) {
          throw "Video, User or User content does not exist!";
        }

        // Update the likes count in video document and user content document
        const newLikesCount = (videoDoc.data().likes || 0) + 1;
        transaction.update(videoRef, { likes: newLikesCount });
        transaction.update(userContentRef, { likes: newLikesCount });
  
        // Add the video to the user's 'likedVideos' subcollection
        const userLikedVideoRef = doc(userRef, "likedVideos", videoId);
        await setDoc(userLikedVideoRef, { ...videoDoc.data(), id: videoId }); // Add the video data
  

        // Add the user to the video's 'likes' subcollection
        const videoLikeRef = doc(videoRef, "likes", userId);
        await setDoc(videoLikeRef, { userId: userId });
      });

      setUserHasLiked(true);
    }
  }
  
  async function unlikeVideo(videoId, userId) {
    if (videoId && userId && !loading) {
      const videoRef = doc(firestore, "videos", videoId);
      const userRef = doc(firestore, "Users", userId);
      const userContentRef = doc(firestore, `Users/${userId}/userContent`, videoId);
  

      await runTransaction(firestore, async (transaction) => {
        const videoDoc = await transaction.get(videoRef);
        const userDoc = await transaction.get(userRef);
        const userContentDoc = await transaction.get(userContentRef);
  
        if (!videoDoc.exists() || !userDoc.exists() || !userContentDoc.exists()) {
          throw "Video, User or User content does not exist!";
        }
  

        // Update the likes count in video document and user content document
        const newLikesCount = Math.max((videoDoc.data().likes || 0) - 1, 0);
        transaction.update(videoRef, { likes: newLikesCount });
        transaction.update(userContentRef, { likes: newLikesCount });

        // Remove the video from the user's 'likedVideos' subcollection
        const userLikedVideoRef = doc(userRef, "likedVideos", videoId);
        if ((await getDoc(userLikedVideoRef)).exists()) {
          await deleteDoc(userLikedVideoRef);
        }

        // Remove the user from the video's 'likes' subcollection
        const videoLikeRef = doc(videoRef, "likes", userId);
        if ((await getDoc(videoLikeRef)).exists()) {
          await deleteDoc(videoLikeRef);
        }
      });

      setUserHasLiked(false);
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
        console.error("Error following the user:", error);
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
      <div className=" h-full rounded-3xl p-5 w-3/4 bg-black bg-opacity-40">
        {userData && (
          <div className="username flex p-5 text-amber-200 text-xl">
            <Link to={`/profile/${userId}`}>
            <img
              className=" rounded-full h-24 bg-yellow-500"
              src={photoURL}
              at={`Profile of User ${userId}`}
            />
            </Link>
            <div className="pl-4">
              <p>
                <span className="text-3xl">{userData.firstName}</span> |{" "}
                <span className="font-light">{userData.bio}</span>
              </p>
              <p className="pt-2">{videoData.title}</p>
            </div>
          </div>
        )}
        <hr className="mt-2 mb-2" />
        <div className="app_videos h-full flex justify-center relative rounded-2xl overflow-scroll">

          <div className="flex flex-col">

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
              onClick={handleCommentBtnClick}
            />
            <BiBookmarks className="m-4" style={{ color: "tan" }} size={28} />
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
              />
            ) : (
              <RiUserUnfollowFill
                className="m-4 hover:cursor-pointer"
                style={{ color: "tan" }}
                size={28}
                onClick={() => {
                  unfollowUser(); //call the unfollower user function
                  console.log("user clicked unfollow button");
                }}
              />
            )}
          </div>
          <Video videoData={videoData} />
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
