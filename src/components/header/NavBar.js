import { useState, useContext } from "react";
import LoginLogout from "../../utils/LoginLogout";
import LoginModal from "../modals/Login";
import CollapseMenu from "./CollapseMenu";
import AuthContext from "../../utils/AuthContext"; // Import the AuthContext
import SearchVideosByTags from "../../utils/SearchBarTags";
import SearchContext from "../../utils/SearchContext";

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setMatchingVideos } = useContext(SearchContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Search bar state
  const [searchTag, setSearchTag] = useState("");
  // const [matchingVideos, setMatchingVideos] = useState([]);

  // handle Search bar function
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchTag.trim() !== "") {
        const videos = await SearchVideosByTags(searchTag);
        console.log("Matching Videos:", videos);
        setMatchingVideos(videos);
        console.log(videos);
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
        relative
      "
      >
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

        {/* <div
          className="
        container 
        h-14
        my-4
        md:my-0
        flex 
        items-center
        mx-auto
        relative"
        >
          <input
            className="bg-yellow-600"
            type="text"
            placeholder="Search Tutorials"
          />

          <div 
            className="
          search h-8 w-8
          bg-yellow-400"
          >
          </div>
        </div> */}

        {/* <div className="flex sm:justify-end sm:items-center"> */}
        <div className="flex items-center"></div>
        <div className="container relative bottom-1 right-24">
          <input
            className="bg-yellow-600"
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
        {/* </div> */}
      </nav>
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
    </header>
  );
}
export default Navbar;