import { useState, useContext } from "react";
import HandleLogout from "../../utils/Logout";
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
    <header className="w-full header-glow">
      <nav className="sm:flex sm:justify-between sm:items-center md:grid md:grid-cols-3 w-full p-4 bg-black">
        <div className="flex items-center">
          <CollapseMenu />
          <h1 className="text-white text-2xl md:text-3xl  ml-2 title">
            short_Stack
          </h1>
        </div>
        <div className="container w-72 h-24 relative left-10">
          <input
            className="bg-yellow-600"
            type="text"
            placeholder="Search Tutorials"
          />
          <div className="search bg-yellow-400"></div>
        </div>
        <div className="flex sm:justify-end sm:items-center md:col-span-1 mr-5">
          {isLoggedIn ? (
            <button
              type="button"
              className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
              data-modal-target="authentication-modal"
              onClick={HandleLogout}>
              Logout
          </button>
          ) : (
          <button
            type="button"
            className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
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
