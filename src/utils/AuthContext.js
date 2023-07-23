import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    // const [emailVerified, setEmailVerified] = useState(null); <--- stretch goal for email confirmation

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // If user is signed in then...
            if (user) {
                // Conditional rules for a user that is logged in
                setIsLoggedIn(true);

                // List global props here
                const userInfo = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                }
            } else {
                // Conditional rules for a User that is logged out
                setIsLoggedIn(false);
                setUserInfo(null);
                
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;