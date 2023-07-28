import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import AuthContext from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginLogout(props) {
  // Access the authentication status from AuthContext
  const { isLoggedIn, logout } = useContext(AuthContext);

  // Get the navigation function from react-router-dom
  const navigate = useNavigate();

  // Function to handle user login
  const HandleLogin = async () => {
    // Show an alert if email or password is missing
    if (!props.email || !props.password) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Firebase method to log in a user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, props.email, props.password)

      // Get the logged-in user
      const user = userCredential.user;

      if (user) {
        // Close the login modal after successful login
        props.closeModal();
      };
    } catch (error) {
      // Handle login errors
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/wrong-password") {
        // Notify the parent component about the login error
        props.onLoginError();
      } else {
        console.error("Error logging user in:", errorMessage);
      }
    }
  };

  const handleLogoutClick = async () => {
    await logout(); // Call the logout function from AuthContext
    navigate("/"); // Redirect to the homepage after logout
  };

  return (
    <div className="relative z-20">
      {isLoggedIn ? (
        <button
          type="button"
          className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
          data-modal-target="authentication-modal"
          onClick={handleLogoutClick}
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
};
