// Importing necessary dependencies and components
import { useState, useContext } from "react";
import LoginLogout from "../../utils/LoginLogout";
import LoginModal from "../modals/Login";
import CollapseMenu from "./CollapseMenu";
import AuthContext from "../../utils/AuthContext";
import SearchVideosByTags from "../../utils/SearchBarTags";
import SearchContext from "../../utils/SearchContext";

// Functional component 'Navbar'
function Navbar() {
  // Accessing isLoggedIn state from the AuthContext using useContext hook
  const { isLoggedIn } = useContext(AuthContext);

  // Setting up a local state to manage the login modal open/closed state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Accessing setMatchingVideos function from the SearchContext using useContext hook
  const { setMatchingVideos } = useContext(SearchContext);

  // Function to open the login modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the login modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Search bar state and handler function
  const [searchTag, setSearchTag] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchTag.trim() !== "") {
        // Search videos by tags and update the matching videos state
        const videos = await SearchVideosByTags(searchTag);
        setMatchingVideos(videos);
      } else {
        setMatchingVideos([]);
      }
    } catch (error) {
      console.error("error searching videos", error);
    }
  };

  return (
    <header className="w-full">
      <nav
        className="
        w-full 
        py-4
        px-2
        lg:ml-0
        lg:pl-4
        md:mx-4
        grid-cols-1
        justify-center
        sm:items-center 
        items-center
        // md:grid 
        // md:grid-cols-3 
        duration-500
        bg-black
        relative"
      >
        {/* Logo and CollapseMenu */}
        <div
          className="
          flex 
          items-center 
          sm:justify-center
          md:justify-start
          justify-center w-full"
        >
          <div className="absolute inset-x-0 bottom-0 h-0 border-yellow-600 border border-opacity-25 "></div>
          <div className="absolute inset-x-0 bottom-0 h-4 bg-yellow-300 opacity-20 filter blur"></div>
          <CollapseMenu openModal={openModal} />
          <h1
            className="
            text-white 
            md:text-4xl 
            lg:text-5xl
            text-5xl  
            title"
          >
            short_Stack
          </h1>
        </div>

        {/* Search bar */}
        <div className="flex items-center"></div>
        <div className="container relative bottom-1 right-24">
          <input
            className="bg-yellow-600 "
            type="text"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            onSubmit={handleSearch}
            placeholder="Search Tutorials"
          />
          <div
            className="search h-4 w-6 bg-yellow-400"
            onClick={handleSearch}
          ></div>
        </div>

        {/* Login button */}
        <div className="login-button absolute top-5 right-6 mr-1">
          {isLoggedIn ? (
            <LoginLogout />
          ) : (
            <button
              type="button"
              className="focus:outline-none
              text-black
              bg-yellow-400
              focus:ring-4
              hover:bg-yellow-500 focus:ring-yellow-300 
              hover:rounded-3xl
              ease-in-out duration-500
              font-medium
              rounded-lg
              text-sm
              px-5 py-2.5
              dark:focus:ring-yellow-900
              w-full 
              md:w-auto"
              data-modal-target="authentication-modal"
              onClick={openModal}
            >
              Login
            </button>
          )}
        </div>
        {/* Rendering the LoginModal component */}
      </nav>
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
    </header>
  );
};

// Exporting the Navbar component as the default export
export default Navbar;