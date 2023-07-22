import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Logout() {

    const handleLogout = async () => {
        // Firebase method to sign the user out
        await signOut(auth).then(() => {
            alert("You have been signed out successfully.")
            // ToDo: add conditional rendering for page routing
        })
        .catch((error) => {
            console.log(error)
        });
    };
//     <div className="flex mt-1 justify-center text-xs">
//     <a onclick={handleLogout} className="text-blue-499 hover:text-yellow-300">
//       Sign Out
//     </a>
//   </div>
    return (
        <button onClick={handleLogout} className="flex items-center justify-center h-12 px-6  w-64 bg-yellow-500 mt-8 rounded font-semibold text-sm text-black hover:bg-yellow-400">
            Login
        </button>
    )
};
