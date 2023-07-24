import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState(null);
    // const [emailVerified, setEmailVerified] = useState(null); <--- stretch goal for email confirmation
    
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
        });

        return () => unsubscribe();
    }, []);

    // if (!user) {
    //     return // Default render to home page
    // }

    return (
<<<<<<< HEAD
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
=======
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, uid, setUid }}>
>>>>>>> 8c887e01eafcc4b4d89817de0fc7f19e7208de45
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;