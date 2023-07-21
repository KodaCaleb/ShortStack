import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import PostContainer from "../components/VideoContainer/PostContainer"
import AccountModal from './Account';
// import AccountModal from './Account';

export default function UserProfileHeading() {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isImageEditable, setIsImageEditable] = useState(false);
  const [isUsernameHovered, setIsUsernameHovered] = useState(false);
  const [isUsernameEditable, setIsUsernameEditable] = useState(false);
  const [isBioHovered, setIsBioHovered] = useState(false);
  const [isBioEditable, setIsBioEditable] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false)
  };

  const [image, setImage] = useState(
    process.env.PUBLIC_URL + '/pancakeholder.img.png'
  );
  const [username, setUsername] = useState('Username');
  const [bioInfo, setBioInfo] = useState('Here for the lulz');

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
            <button
          type="button"
          className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900 my-4"
          data-modal-target="authentication-modal"
          onClick={openModal}
        >
          Account Info
        </button>
          </div>
        </div>

        {/* </div> */}
        <AccountModal isOpen={isModalOpen} closeModal={closeModal} />

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
