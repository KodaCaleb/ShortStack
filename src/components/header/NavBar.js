// Importing necessary dependencies and components
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import LoginLogout from "../../utils/LoginLogout";
import LoginModal from "../modals/Login";
import CollapseMenu from "./CollapseMenu";
import AuthContext from "../../utils/AuthContext";
import SearchVideosByTags from "../../utils/searchLogic/SearchBarTags";
import SearchContext from "../../utils/searchLogic/SearchContext";

// Functional component 'Navbar'
function Navbar() {
  // State variables to help with componenent functionality
  const { isLoggedIn } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setMatchingVideos } = useContext(SearchContext);

  const location = useLocation();

  // Define an array of paths where the search bar should be hidden
  const hiddenSearchBarPaths = ["/profile", "/account", "/upload"];

  // Function to check if the search bar should be visible based on the current location
  const isSearchBarVisible = !hiddenSearchBarPaths.includes(location.pathname);

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
      // Removes white space and converts to lowercase lettering
      const lowercaseSearch = searchTag.trim().toLowerCase();
      if (lowercaseSearch !== "") {
        // Search videos by tags and update the matching videos state
        const videos = await SearchVideosByTags(lowercaseSearch);
        // Convert tags of fetched videos to lowercase for case-insensitive comparison
        const lowercaseVideoTags = videos.map((video) => ({
          ...video,
          tags: video.tags.map((tag) => tag.toLowerCase()),
        }));
        // Filter videos with tags that match the search tag
        const matchingVideos = lowercaseVideoTags.filter((video) =>
          video.tags.includes(lowercaseSearch)
        );
        setMatchingVideos(matchingVideos);
      } else {
        setMatchingVideos([]);
      }

      const formElement = e.currentTarget;
    const searchButton = formElement.querySelector("#search");
    if (searchButton) {
      searchButton.blur();
    }

    } catch (error) {
      console.error("error searching videos", error);
    }
    setSearchTag("");
  };

  return (
    <header className="fixed z-10 w-full">
      <nav
        className=" 
        nav
        w-full 
        py-2
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
            mb-3
            text-white 
            md:text-4xl 
            lg:text-4xl
            text-xl  
            title"
          >
            short_Stack
          </h1>
        </div>

        {/* Search bar */}
        <div className="flex items-center"></div>
        {isSearchBarVisible && (
        <div className="container relative bottom-1 right-24">
        <form
          id="searchForm"
          className="searchbar-container"
          onSubmit={handleSearch}
        >
          <input
            className="input bg-yellow-600 "
            type="text"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            placeholder="Search Tutorials"
          />
          <div
            type="submit"
            className="search h-4 w-6 bg-yellow-400"
          ></div>
            </form>
        </div>
        )}

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