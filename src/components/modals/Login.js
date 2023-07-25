import { useState, useContext, useEffect } from "react";
import LoginLogout from "../../utils/LoginLogout";
import SignUpModal from "./SignUp";
import Syrup from "../../assets/syrup.gif";
import AuthContext from "../../utils/AuthContext";
import ForgotPassword from "../../utils/EmailAuth";

export default function LoginModal({ isOpen, closeModal }) {
  const [modalMode, setModalMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);

  const handleLoginError = () => {
    setIsIncorrectPassword(true);
  };

  const toggleSignUpMode = () => {
    setModalMode(!modalMode);
  };

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

  if (!isOpen) {
    return null;
  }

  const loginInfo = {
    email,
    password,
  };

  return (
    <>
      {/* Modal */}

      <div className="absolute z-10 flex flex-col items-center justify-start text-white h-full w-screen bg-black bg-opacity-80 backdrop-blur-sm">
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
              className={`flex relative items-center z-10 text-black h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 ${
                isIncorrectPassword ? "border-red-500 border-2" : ""
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
              ></img>
            </div>
            <div className="flex flex-col items-center ">
              <LoginLogout
                email={loginInfo.email}
                password={loginInfo.password}
                closeModal={closeModal}
                onLoginError={handleLoginError}
              />
            </div>
            <div className="flex mt-6 justify-center text-xs">
              <a href="#" className="text-blue-499 hover:text-yellow-300">
                <ForgotPassword email={email} />
              </a>
              <span className="mx-2 text-gray-300">/</span>
              <a
                href="#"
                className="text-blue-499 hover:text-yellow-300"
                onClick={toggleSignUpMode}
              >
                {modalMode ? "Back to Login" : "Sign Up"}
              </a>
            </div>
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
}
