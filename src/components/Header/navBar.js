import { useState } from "react";
import PancakeLogo from "../../assets/pancakeLogo.png";
// import Syrup from "../../assets/syrupStack2.svg";
import LoginModal from "../Modals/Login";
import CollapseMenu from "./CollapseMenu";

function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false)
  }
  return (
    <header className="w-full">
      <nav className="flex items-center justify-between w-full p-3 bg-black">
        <div className="flex">
          <CollapseMenu />
          <h1 className="text-white text-5xl align-middle ml-2 pt-2 title">
            short_Stack
          </h1>
        </div>
        <div>
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-96 p-4 h-[2.5rem] pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                placeholder="Search Tutorials"
                required
              />
              <button
                type="submit"
                className="text-white h-[2rem] absolute right-2 bottom-1 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {/* <div className=" flex space-x-2"> */}
        <button
          type="button"
          className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
          data-modal-target="authentication-modal"
          onClick={openModal}
        >
          Login
        </button>
      
        {/* </div> */}
      </nav>
      <LoginModal isOpen={isModalOpen} closeModal={closeModal}/>
    </header>
  );
}

export default Navbar;
