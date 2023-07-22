import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default async function HandleLogout(props) {
    // Firebase method to sign the user out
    await signOut(auth).then(() => {
        alert("You have been signed out successfully.")
        // ToDo: add conditional rendering for page routing
    })
    .catch((error) => {
        console.log(error)
    });
};