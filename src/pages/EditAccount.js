import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { firestore, auth } from "../firebase";
import { collection, setDoc, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import AuthContext from "../utils/AuthContext";
import { FaPencilAlt } from "react-icons/fa";
import { getAuth, deleteUser } from "firebase/auth";

export default function EditAccount() {
  const { user } = useContext(AuthContext);
  console.log("Login status:", user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  //   storing the updated input values
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");

  //Authenticated User's info displayed in account form when signed in
  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        try {
          //Get firestore user data with id
          const userDocRef = doc(firestore, "Users", user.uid);

          //Get the snapshot of the document
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();

            setFirstName(userData.firstName || "");
            setLastName(userData.lastName || "");
            setBio(userData.bio || "");
          }
        } catch (error) {
          return error;
        }
      };
      getUserData();
    }
  }, [user]);

  // Event handler for updating account information
  const handleEditAccount = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(firestore, "Users", user.uid);

      //object with new update user
      const updatedData = {
        firstName: updatedFirstName,
        lastName: updatedLastName,
        bio: updatedBio,
      };
      await setDoc(userDocRef, updatedData, { merge: true });
    } catch (error) {
      return error;
    }
  };

  // Function to handle the "Delete Account" button click
async function handleDeleteAccount() {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Delete the user from Firebase Authentication
      await deleteUser(user);

      // Extension automatically deletes the associated data based on the configured paths.
    }
  } catch (error) {
    console.error("Error deleting user account:", error);
    // Handle any errors that occurred during the deletion process
  };
}
  

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center text-yellow-500 ">
        <h3 className="pt-4 text-2xl text-center"> View Account Info</h3> */}
      <form
        className="relative flex flex-col  bg-black text-white rounded shadow-lg p-12 mt-12 border border-white"
        action=""
      >
        <div className="flex flex-col items-center justify-center text-yellow-500 ">
          <h3 className="p-2 my-3 text-2xl text-center"> View Account Info</h3>
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
                value={updatedFirstName || firstName}
                onChange={(e) => setUpdatedFirstName(e.target.value)}
              />
            </div>
            <div className="md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={updatedLastName || lastName}
                onChange={(e) => setUpdatedLastName(e.target.value)}
              />
            </div>
          </div>
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="usernameField"
          >
            {" "}
            Email
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Email"
            value={user?.email}
          />
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="passwordField"
          >
            {" "}
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="password"
          />
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="phoneNumberField"
          >
            {" "}
            Bio
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="bio"
            value={updatedBio || bio}
            onChange={(e) => setUpdatedBio(e.target.value)}
          />
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-center h-12 px-6 w-64 bg-yellow-500 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-yellow-300
           hover:rounded-3xl
           hover:border-2
           hover:border-amber-700
           hover:w-80 ease-in-out duration-300"
              onClick={handleEditAccount}
            >
              Save Changes
            </button>
          </div>
          <div className="flex mt-6 justify-center text-xs">
            <a href="#" className="text-blue-499 hover:text-yellow-300"
            onClick={handleDeleteAccount}>
              Delete Account
            </a>
          </div>
        </div>
      </form>
    </>
  );
}
