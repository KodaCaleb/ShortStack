import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { firestore, auth, storage } from "../firebase";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // new loading state
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to handle user logout
  const logout = async () => {
    try {
      // Firebase method to sign the user out
      await signOut(auth);
      setIsLoggedIn(false); // Update the isLoggedIn state to false
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

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
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
