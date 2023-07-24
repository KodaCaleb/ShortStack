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

  useEffect(() => {
    // Authenticate the users login status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If user is signed in then...
      if (user) {
        // Conditional rules for a user that is logged in
        setIsLoggedIn(true);

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
        console.log(user);

        // Method to grab users data from firestore DB
        const docRef = doc(firestore, "Users", user.uid);
        const docSnap = getDoc(docRef);
        docSnap
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.data();

              // List global props for firestore DB
              const { firstName, lastName, bio } = userData;
              setUserData({ firstName, lastName, bio });
              console.log("Document data:", snapshot.data());
            } else {
              console.log("No data exists");
            }
          })
          .catch((error) => {
            console.error("Error fetching document:", error);
          });
      } else {
        // Conditional rules for a User that is logged out
        setIsLoggedIn(false);
        setUser(null);
        setUserData(null);
      }
      setLoading(false); // set loading to false in both cases
    });

    return () => unsubscribe();
  }, []);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
