import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import PostContainer from "../components/videoContainer/PostContainer"
import { firestore } from "../firebase"
import { doc } from "firebase/firestore"
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

export default function UserProfileHeading() {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isImageEditable, setIsImageEditable] = useState(false);
  const [isUsernameHovered, setIsUsernameHovered] = useState(false);
  const [isUsernameEditable, setIsUsernameEditable] = useState(false);
  const [isBioHovered, setIsBioHovered] = useState(false);
  const [isBioEditable, setIsBioEditable] = useState(false);

  const [image, setImage] = useState(
    process.env.PUBLIC_URL + '/pancakeholder.img.png'
  );
  const [username, setUsername] = useState("Username");
  const [bioInfo, setBioInfo] = useState('Here for the lulz');

// starting framework to get fields from profile document
  const userProfileRef = doc(firestore, 'Users', '1AgshjHIigujTKEXtVQR', 'userInfo', 'profile');
  // use the UseDocumentOnce hook 
  const [profile, loading, error] = useDocumentOnce(userProfileRef);

  // using useEffect to make API call only when profile is updated
  useEffect(() => {
// display when data is being retrieved
  if (loading) {
    return <p>Loading...</p>;
  }
// display when data is being retrieved
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (profile && profile.exists()) {
    const profileData = profile.data();
    // Use the data from the "profile" document.
    const { bio, darkMode, photo, username } = profileData;
    console.log("Bio:", bio, "Dark Mode:", {darkMode}, "Photo:", {photo}, "Username:", {username})
  }
}, [profile]);


  const handleImageMouseEnter = () => {
    setIsImageHovered(true);
  };

  const handleImageMouseLeave = () => {
    setIsImageHovered(false);
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    setIsImageEditable(!isImageEditable);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // TODO add code to handle saving image and to use setImage useState
  };

  const handleUsernameMouseEnter = () => {
    setIsUsernameHovered(true);
  };

  const handleUsernameMouseLeave = () => {
    setIsUsernameHovered(false);
  };

  const handleUsernameClick = () => {
    setIsUsernameEditable(!isUsernameEditable);
  };

  const handleBioMouseEnter = () => {
    setIsBioHovered(true);
  };

  const handleBioMouseLeave = () => {
    setIsBioHovered(false);
  };

  const handleBioClick = () => {
    setIsBioEditable(!isBioEditable);
  };

  return (
    <>
      <div className="flex h-100 flex-col items-center">
        <div className="flex justify-center md:flex-row mx-4 md:w-1/2 m-20">
          <div
            className="self-start rounded-full relative flex items-center justify-center px-4 max-w-[150px] max-h-[150px] border border-white bg-yellow-400"
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
            onClick={handleImageClick}
          >
            {isImageEditable ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleImageUpload}
                />
                <img
                  src={image}
                  alt="self"
                  className="w-full h-full object-cover rounded-full"
                />
              </>
            ) : (
              <>
                <img
                  src={image}
                  alt="self"
                  className="w-full h-full object-cover rounded-full"
                />
                {isImageHovered && (
                  <div className="absolute top-2 right-2">
                    <FaPencilAlt className="text-xl text-white" />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col justify-start px-4 md:pl-4 w-full">
            {/* stack of username and bio */}
            <div
              className="relative p-1 my-4 border border-white text-white"
              onMouseEnter={handleUsernameMouseEnter}
              onMouseLeave={handleUsernameMouseLeave}
              onClick={handleUsernameClick}
            >
              {isUsernameEditable ? (
                <input
                  type="text"
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <>
                  <span className="text-xl">{username}</span>
                  {isUsernameHovered && (
                    <div className="absolute top-2 right-2">
                      <FaPencilAlt className="text-xl text-white" />
                    </div>
                  )}
                </>
              )}
            </div>
            <div
              className="relative p-1 border border-white text-white"
              onMouseEnter={handleBioMouseEnter}
              onMouseLeave={handleBioMouseLeave}
              onClick={handleBioClick}
            >
              {isBioEditable ? (
                <input
                  type="text"
                  defaultValue={bioInfo}
                  onChange={(e) => setBioInfo(e.target.value)}
                />
              ) : (
                <>
                  {bioInfo}
                  {isBioHovered && (
                    <div className="absolute top-2 right-2">
                      <FaPencilAlt className="text-xl text-white" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-3/4 grid grid-cols-3">
          <PostContainer />
          <PostContainer />
          <PostContainer />
          <PostContainer />
          <PostContainer />
          <PostContainer />
        </div>
      </div>
    </>
  );
};
