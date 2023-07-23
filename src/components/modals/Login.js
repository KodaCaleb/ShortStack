import { useState, useContext } from "react";
import LoginLogout from "../../utils/LoginLogout";
import SignUpModal from "./SignUp";
import AuthContext from "../../utils/AuthContext"; // Import the AuthContext

export default function LoginModal({ isOpen, closeModal }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [modalMode, setModalMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSignUpMode = () => {
    setModalMode(!modalMode)
  }

  if (!isOpen) {
    return null;
  }

  const loginInfo = {
    email,
    password,
  }

  return (
    <>
      {/* Modal */}

      <div className="absolute z-10 flex flex-col items-center justify-center text-white h-screen w-screen bg-black bg-opacity-80 backdrop-blur-sm">
        {modalMode ? (
          <SignUpModal isOpen={isOpen} closeModal={closeModal} toggleModalMode={toggleSignUpMode} />
        ) : (<form
          className=" border-white border relative flex flex-col bg-black rounded shadow-lg p-12 mt-12"
          action=""
        >
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
          <label className="font-semibold text-xs pt-5" htmlFor="passwordField">
            {" "}
            Password
          </label>
          <input
            className="flex items-center text-black h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginLogout email={loginInfo.email} password={loginInfo.password} />
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
