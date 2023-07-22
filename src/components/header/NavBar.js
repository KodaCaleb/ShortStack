import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import LoginModal from "../modals/Login";
import CollapseMenu from "./CollapseMenu";
import "../../App.css";
function Navbar() {
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
      pt-4
      pb-4
      pl-14
      pr-14
      sm:items-center 
      md:grid 
      md:grid-cols-3 
      bg-black
      relative"
      >
        <div className="flex items-center justify-center w-full">
          <div className="absolute inset-x-0 bottom-0 h-4 bg-yellow-300 opacity-20 filter blur"></div>
          <CollapseMenu />
          <h1 className="
          text-white 
          md:text-5xl 
          text-5xl 
          ml-2 
          title">
            short_Stack
          </h1>
        </div>

        <div
          className="
        container 
        h-24 
        relative
        ">
          <input
            className="bg-yellow-600"
            type="text"
            placeholder="Search Tutorials"
          />
          <div className="search bg-yellow-400"></div>
        </div>

        <div className="flex sm:justify-end sm:items-center">
          <button
            type="button"
            className="focus:outline-none
            text-black
            bg-yellow-400
            hover:bg-yellow-500
            focus:ring-4
            focus:ring-yellow-300
            font-medium
            rounded-lg
            text-sm
            px-5 py-2.5
            dark:focus:ring-yellow-900
            w-full md:w-auto"
            data-modal-target="authentication-modal"
            onClick={openModal}
          >
            Login
          </button>
        </div>
      </nav>
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
    </header>
  );
}
export default Navbar;
