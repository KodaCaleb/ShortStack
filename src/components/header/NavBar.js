import { useState, useContext } from "react";
import LoginLogout from "../../utils/LoginLogout";
import LoginModal from "../modals/Login";
import CollapseMenu from "./CollapseMenu";
import AuthContext from "../../utils/AuthContext"; // Import the AuthContext

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  console.log("Login status:", isLoggedIn)

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <header className="w-full">
      <nav
        className="
      w-full 
      py-4
      px-2
      sm:items-center 
      sm:ease-linear
      md:grid 
      md:grid-cols-3 
      sm:transition-all
      duration-500
      bg-black
      relative
      "
      >
        <div className="flex items-center justify-center w-full">
          <div className="absolute inset-x-0 bottom-0 h-4 bg-yellow-300 opacity-20 filter blur"></div>
          <CollapseMenu />
          <h1 className="
          text-white 
          md:text-4xl 
          lg:text-5xl
          text-5xl  
          title">
            short_Stack
          </h1>
        </div>

        <div
          className="
        container 
        h-14
        w-auto
        relative
        ">
          <input
            className="bg-yellow-600"
            type="text"
            placeholder="Search Tutorials"
          />
          <div className="search h-8 w-8
            bg-yellow-400"></div>
        </div>

        <div className="flex sm:justify-end sm:items-center">
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
      </nav>
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
    </header>
  );
}
export default Navbar;
