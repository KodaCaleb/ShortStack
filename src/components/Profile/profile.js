import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

export default function UserProfileHeading() {
    const [isImageHovered, setIsImageHovered] = useState(false);
    const [isUsernameHovered, setIsUsernameHovered] = useState(false);
    const [isUsernameEditable, setIsUsernameEditable] = useState(false);

    const [username, setUsername] = useState("username");

    const handleImageMouseEnter = () => {
        setIsImageHovered(true);
    };

    const handleImageMouseLeave = () => {
        setIsImageHovered(false);
    };

    const handleUsernameMouseEnter = () => {
        setIsUsernameHovered(true);
    }

    const handleUsernameMouseLeave = () => {
        setIsUsernameHovered(false);
    }

    const handleUsernameClick = () => {
        setIsUsernameEditable(true);
      };

    return (
        <>
            <div className="flex md:flex-row justify-center md:justify-between w-full md:w-1/2 border-solid border">
                <div className="self-start rounded-full overflow-hidden flex items-center justify-center text-white px-4 border-solid border max-w-[200px] max-h-[200px] relative" onMouseEnter={handleImageMouseEnter}
                    onMouseLeave={handleImageMouseLeave}>
                    <img src={""} alt="self" className="w-full h-full object-cover" />
                    {isImageHovered && (
                        <div className="absolute top-2 right-2">
                            <FaPencilAlt className="text-white text-xl" />
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-start pl-2 pr-4 md:pl-4 border-solid border">
                    {/* stack of username and bio */}
                    <div className="text-white border-solid border relative"
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
                {username}
                {isUsernameHovered && (
                  <div className="absolute top-2 right-2">
                    <FaPencilAlt className="text-white text-xl" />
                  </div>
                )}
              </>
            )}
                </div>
                <div className="text-white border-solid border transition-opacity hover:opacity-50">
                    {"if the bio is much longer what happens to the size of the box"}
                </div>
            </div>
        </div >
    </>
  );

}