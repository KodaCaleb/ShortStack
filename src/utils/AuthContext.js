import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { firestore, auth } from "../firebase";
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
        const { uid, email } = user;
        setUser({ uid, email });

        // Method to grab users data from firestore DB
        const docRef = doc(firestore, "Users", user.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();

            // List global props for firestore DB
            const { firstName, lastName, devRole, displayName, photoURL } = userData;
            setUserData({ firstName, lastName, devRole, displayName, photoURL });
          } else {
            console.log("No data exists");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }

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

  const context = {
    loading,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    userData,
    setUserData,
    currentUser,
    setCurrentUser,
    logout,
  }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
