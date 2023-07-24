import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import AuthContext from "../utils/AuthContext"; // Import the AuthContext
import { closeModal } from "../components/modals/Login";


export const HandleLogout = async () => {
    // Firebase method to sign the user out
    await signOut(auth)
    .then(() => {
        alert("You have been signed out successfully.");
    })
    .catch((error) => {
        console.log(error);
    });
};

export default function LoginLogout(props) {
    const { isLoggedIn } = useContext(AuthContext);

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
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
            props.closeModal();
    }

    return (
        <div>
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
                    onClick={HandleLogin}>
                    Login
                </button>
            )}
        </div>
    )
}
