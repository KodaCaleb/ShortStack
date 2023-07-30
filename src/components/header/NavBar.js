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
  const hiddenSearchBarPaths = ["/myprofile", "/account", "/Upload"];

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
        p-2
        duration-500
        bg-black
        relative"
      >
        {/* Logo and CollapseMenu */}
        <div className="nav-header h-16 flex grid-cols-3">
          <div className="absolute inset-x-0 bottom-0 h-0 border-yellow-600 border border-opacity-25 "></div>
          <div className="absolute inset-x-0 bottom-0 h-4 bg-yellow-300 opacity-20 filter blur"></div>
          <div className="nav-image w-1/3">
          <CollapseMenu openModal={openModal} />
          </div>
          <h1
            className=" 
            logo
            flex
            place-self-center
            justify-center
            w-1/3
            mb-2
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
        {isSearchBarVisible ? (
          <div className="container relative">
            <form
              id="searchForm"
              className="searchbar-container"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchTag.trim() !== "") {
                  handleSearch(e);
                }
              }}
            >
              <input
                className="input bg-yellow-600"
                type="text"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                placeholder="Search Tutorials"
              />
              <button
                type="submit"
                className="search active h-4 w-6 bg-yellow-400"
              ></button>
            </form>
          </div>
        ) : (
          <div></div>
        )}

        {/* Login button */}
        <div className="login-button absolute top-4 right-4">
          {isLoggedIn ? (
            <LoginLogout />
          ) : (
            <button
              type="button"
              className="
              focus:outline-none
              text-black
              bg-yellow-400
              focus:ring-4
              hover:bg-yellow-500 focus:ring-yellow-300 
              hover:rounded-3xl
              ease-in-out duration-500
              rounded-lg
              px-5 py-2.5
              dark:focus:ring-yellow-900"
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