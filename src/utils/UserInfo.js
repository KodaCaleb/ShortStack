import { useContext } from "react";
import AuthContext from "../utils/AuthContext";

export default async function UserInfo() {
    const { isLoggedIn, userInfo } = useContext(AuthContext);

    if (isLoggedIn && userInfo) {
        const { uid, displayName, email, photoURL, emailVerified } = userInfo;

        return (
        <div>
            <p>User ID: {uid}</p>
            <p>Name: {displayName}</p>
            <p>Email: {email}</p>
            <p>Photo URL: {photoURL}</p>
            <p>Email Verified: {emailVerified ? "Yes" : "No"}</p>
        </div>
        );
    } else {
        return <p>User is not logged in.</p>;
    }
};