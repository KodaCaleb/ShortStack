import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import AuthContext from "../utils/AuthContext"; // Import the AuthContext
import { closeModal } from "../components/modals/Login";
import { useNavigate } from "react-router-dom";

export const HandleLogout = async (navigate) => {
  try {
    // Firebase method to sign the user out
    await signOut(auth);
    // Redirect to the homepage after sign-out
    navigate("/");
  } catch (error) {
    console.log("Error signing out", error);
  }
};

export default function LoginLogout(props) {
  const { isLoggedIn } = useContext(AuthContext);
  useNavigate();

  // Firebase authenticator to log in a user
  const HandleLogin = async () => {
    if (!props.email || !props.password) {
      alert("Please fill in all required fields");
      return;
    }

    await signInWithEmailAndPassword(auth, props.email, props.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user, ": is now logged in!");
        props.closeModal();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          props.onLoginError();
        } else {
          alert(errorMessage);
        }
      });
  };

  return (
    <div className="relative z-20">
      {isLoggedIn ? (
        <button
          type="button"
          className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
          data-modal-target="authentication-modal"
          onClick={HandleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          type="button"
          className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg focus:border-2  text-sm px-6 h-10  focus:border-white dark:focus:ring-yellow-900 w-40 hover:border-amber-700 hover:rounded-3xl hover:w-52 ease-in-out duration-300"
          data-modal-target="authentication-modal"
          onClick={HandleLogin}
        >
          Login
        </button>
      )}
    </div>
  );
}
