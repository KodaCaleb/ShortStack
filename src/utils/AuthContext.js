import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { firestore, auth, storage } from "../firebase";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // new loading state
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Authenticate the users login status
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // If user is signed in then...
      if (user) {
        // Conditional rules for a user that is logged in
        setIsLoggedIn(true);
        // Store the current user data in the state
        setCurrentUser(auth.currentUser);

        // List global props for authentication DB
        const {
          uid,
          displayName,
          email,
          photoURL,
          emailVerified,
          phoneNumber,
        } = user;
        setUser({
          uid,
          displayName,
          email,
          photoURL,
          emailVerified,
          phoneNumber,
        });

        // Set loading to false only after all async tasks have completed.
        setLoading(false);
      } else {
        // Conditional rules for a User that is logged out
        setIsLoggedIn(false);
        setUser(null);
        setUserData(null);
        setCurrentUser(null);

        // Set loading to false only after all async tasks have completed.
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getFirestoreUserData = async (videoData) => {

    // useEffect(() => {
    //   try {
    //     if (videoData.userId) {
    //       const userId = videoData.userId
    //       const docRef = doc(firestore, "Users", userId)
    //       const docSnap = getDoc(docRef)
    //     }
    //     // .then() => {

          
    //       if (docSnap.exists()) {
    //         return docSnap.data();
    //       }
    //     // } else {
    //       console.log("No such document!");
    //       return null;
    //     }
    //   }, [userId])

  }


  return (
    <AuthContext.Provider
      value={{
        loading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        userData,
        setUserData,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
