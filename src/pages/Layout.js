import { Outlet } from "react-router-dom"
import NavBar from "../components/header/NavBar"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";

export default function Layout() {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
        } else {
            // User is signed out
            // ...
        };
    });

    return (
        <>
        <div className="flex flex-col">
            <NavBar />
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
        </>
    )
}