// Importing necessary dependencies and components
import { useState, useEffect } from "react";
import LoginLogout from "../../utils/LoginLogout";
import SignUpModal from "./SignUp";
import Syrup from "../../assets/syrup.gif";
import ForgotPassword from "../../utils/ForgotPassword";

// Functional component 'LoginModal'
export default function LoginModal({ isOpen, closeModal }) {
  // State variables to manage the modal behavior and form fields
  const [modalMode, setModalMode] = useState(false); // Indicates whether the modal is in login or sign-up mode
  const [email, setEmail] = useState(""); // Stores the value of the email input field
  const [password, setPassword] = useState(""); // Stores the value of the password input field
  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false); // Indicates if there's an incorrect password error

  // Function to handle incorrect login error
  const handleLoginError = () => {
    setIsIncorrectPassword(true);
  };

  // Function to toggle between login and sign-up mode in the modal
  const toggleSignUpMode = () => {
    setModalMode(!modalMode);
  };

  // Effect to manage the body overflow when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // If the modal is not open, render nothing
  if (!isOpen) {
    return null;
  };

  // Object to store login information
  const loginInfo = {
    email,
    password,
  };

  return (
    <>
      {/* Modal */}
      <div className="absolute z-10 flex flex-col items-center justify-start text-white h-full w-screen bg-black bg-opacity-80 backdrop-blur-sm">
        {/* Render either Sign Up or Login form based on 'modalMode' */}
        {modalMode ? (
          <SignUpModal
            isOpen={isOpen}
            closeModal={closeModal}
            toggleModalMode={toggleSignUpMode}
          />
        ) : (
          <form
            className="items-center border-white border  relative flex flex-col bg-black rounded shadow-lg p-12 mt-12"
            action=""
          >
            {/* Login form */}
            <h2 className=" text-amber-300 text-center pb-6 text-lg">
              Log into Short_Stack
            </h2>
            <label className="font-semibold text-xs" htmlFor="usernameField">
              {" "}
              Email
            </label>
            <input
              className="flex items-center text-black h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              className="font-semibold text-xs pt-5"
              htmlFor="passwordField"
            >
              {" "}
              Password
            </label>
            <input
              className={`flex relative items-center z-10 text-black h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 ${isIncorrectPassword ? "border-red-500 border-2" : ""
                }`}
              type="password"
              value={password}
              onChange={(e) => {
                setIsIncorrectPassword(false);
                setPassword(e.target.value);
              }}
            />
            <div className="h-20">
              <img
                className=" bottom-4 z-0 relative w-64 h-24"
                src={Syrup}
                alt="syrup drip"
              ></img>
            </div>
            {/* Login button */}
            <div className="flex flex-col items-center ">
              <LoginLogout
                email={loginInfo.email}
                password={loginInfo.password}
                closeModal={closeModal}
                onLoginError={handleLoginError}
              />
            </div>
            <div className="flex mt-6 justify-center text-xs">
              {/* Forgot Password and Sign Up buttons */}
              <button
                className="text-blue-499 hover:text-yellow-300"
                type="button"
              >
                <ForgotPassword email={email} />
              </button>
              <span className="mx-2 text-gray-300">/</span>
              <button
                className="text-blue-499 hover:text-yellow-300"
                onClick={toggleSignUpMode}
              >
                {modalMode ? "Back to Login" : "Sign Up"}
              </button>
            </div>
            {/* Close button */}
            <button
              className=" absolute top-2 right-2 px-2 py-2"
              onClick={closeModal}
            >
              X
            </button>
          </form>
        )}
      </div>
    </>
  );
};
