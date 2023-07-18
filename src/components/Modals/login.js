import React, {useState} from "react";
import SignUpModal from "./signUp";

export default function LoginModal({ isOpen, closeModal }) {
  const [modalMode, setModalMode] = useState (false);

  const toggleSignUpMode = () => {
    setModalMode(!modalMode)
  }
  
  if (!isOpen) {
    return null;
  }
  return (
    <>
      {/* Modal */}

      <div className="flex flex-col items-center justify-center text-white">
        {modalMode ? (
          <SignUpModal isOpen={isOpen} closeModal={closeModal}/>
        ) : (<form
          className=" relative flex flex-col bg-black rounded shadow-lg p-12 mt-12"
          action=""
          
        >
          <label className="font-semibold text-xs" for="usernameField">
            {" "}
            Username or Email
          </label>
          <input
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
          />
          <label className="font-semibold text-xs pt-5" for="passwordField">
            {" "}
            Password
          </label>
          <input
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
          />
          <button className="flex items-center justify-center h-12 px-6  w-64 bg-yellow-500 mt-8 rounded font-semibold text-sm text-black hover:bg-yellow-400">
            Login
          </button>
          <div className="flex mt-6 justify-center text-xs">
            <a href="#" className="text-blue-499 hover:text-yellow-300">
              Forgot Password
            </a>
            <span className="mx-2 text-gray-300">/</span>
            <a href="#" className="text-blue-499 hover:text-yellow-300" onClick={toggleSignUpMode}>
              {modalMode ? "Back to Login" : "Sign Up"}
            </a>
          </div>
          <button className=" absolute top-2 right-2 px-2 py-2" onClick={closeModal}>
           X
          </button>
        </form>)}
        
      </div>
    </>
  );
}
