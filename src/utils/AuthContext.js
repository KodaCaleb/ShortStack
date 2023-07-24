import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // new loading state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // If user is signed in then...
            if (user) {
                // Conditional rules for a user that is logged in
                setIsLoggedIn(true);
                
                // List global props here
                const { uid, displayName, email, photoURL, emailVerified, phoneNumber } = user;
                setUser({ uid, displayName, email, photoURL, emailVerified, phoneNumber });
                console.log(user)
            } else {
                // Conditional rules for a User that is logged out
                setIsLoggedIn(false);
                setUser(null);
            }
            setLoading(false); // set loading to false in both cases
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ loading, isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
