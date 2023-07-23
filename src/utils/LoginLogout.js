import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginLogout() {

    const HandleLogout = async () => {

        // Firebase method to sign the user out
        await signOut(auth).then(() => {
            alert("You have been signed out successfully.")
            // ToDo: add conditional rendering for page routing
            })
            .catch((error) => {
                console.log(error)
            });

        return (
            <button
                type="button"
                className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                data-modal-target="authentication-modal"
                onClick={HandleLogout}>
                Logout
            </button>
        )
    }

    // Firebase authenticator to log in a user
    const HandleLogin = async(props) => {

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

            return (
                <button
                    type="button"
                    onClick={HandleLogin}
                    className="flex items-center justify-center h-12 px-6  w-64 bg-yellow-500 mt-8 rounded font-semibold text-sm text-black hover:bg-yellow-400">
                    Login
                </button>
            )
        }
}