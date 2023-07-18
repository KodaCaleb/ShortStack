import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

export default function UserProfileHeading() {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isImageEditable, setIsImageEditable] = useState(false);
  const [isUsernameHovered, setIsUsernameHovered] = useState(false);
  const [isUsernameEditable, setIsUsernameEditable] = useState(false);
  const [isBioHovered, setIsBioHovered] = useState(false);
  const [isBioEditable, setIsBioEditable] = useState(false);

  const [image, setImage] = useState(process.env.PUBLIC_URL + '/pancakeholder.img.png')
  const [username, setUsername] = useState("Username");
  const [bioInfo, setBioInfo] = useState("Here for the lulz");

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
  }

  const handleUsernameMouseLeave = () => {
    setIsUsernameHovered(false);
  }

  const handleUsernameClick = () => {
    setIsUsernameEditable(!isUsernameEditable);
  };

  const handleBioMouseEnter = () => {
    setIsBioHovered(true);
  }

  const handleBioMouseLeave = () => {
    setIsBioHovered(false);
  }

  const handleBioClick = () => {
    setIsBioEditable(!isBioEditable);
  };

  return (
    <>
      <div className="flex md:flex-row justify-center md:justify-between w-full mx-4 sm:mx-4 md:mx-4 md:w-1/2 w-3/4">
        <div className="self-start rounded-full relative flex items-center justify-center px-4 max-w-[150px] max-h-[150px]" 
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
          onClick={handleImageClick}>
          {isImageEditable ? (
            <>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleImageUpload}
              />
              <img src={image} alt="self" className="w-full h-full object-cover rounded-full" />
              </>
            ) : (
              <>
              <img src={image} alt="self" className="w-full h-full object-cover rounded-full" />
              {isImageHovered && (
                  <div className="absolute top-2 right-2">
                    <FaPencilAlt className="text-xl" />
                  </div>
                )}
              </>
            )}
        </div>
        <div className="flex flex-col justify-start px-4 md:pl-4 w-full">
          {/* stack of username and bio */}
          <div className="relative p-1 my-4"
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
                    <FaPencilAlt className="text-xl" />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="relative p-1" onMouseEnter={handleBioMouseEnter} onMouseLeave={handleBioMouseLeave} onClick={handleBioClick}>
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
                    <FaPencilAlt className="text-xl" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div >
    </>
  );

}