
import React from "react";
import { useState } from "react";
import { firestore, auth } from "../../firebase";
import { IoIosArrowBack } from "react-icons/io";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  runTransaction,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
  collection,
  addDoc,
  doc,
  setDoc,
  runTransaction,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function SignUpModal({ closeModal, toggleModalMode }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
 
  // Event handlers for users entering data
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !username || !bio) {
      alert("Please fill in all required fields");
      return;
    }
    

    // Firebase authentication method to create a new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        const userId = user.uid;

        const userInfo= {
          firstName,
          lastName,
          bio,
        };


        addUserToFirestore(userId, userInfo);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        const userId = user.uid;
        const userInfo= {
          firstName,
          lastName,
          bio,
        };
        addUserToFirestore(userId, userInfo);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  // Sending user input to create account and profile document
  const addUserToFirestore = async (userId, userInfo) => {
    try {
      // Reference the "Users" collection
      const userDocRef = doc(firestore, "Users", userId);
      await setDoc(userDocRef, userInfo)
   // Referencing the "userInfo subcollection
      const userContentCollectionRef = collection(userDocRef, "userContent")
      await addDoc(userContentCollectionRef, {})
        console.log("User data added to Firestore:", {
        userInfo
      });
    } catch (error) {
      console.error("Error adding user data to Firestore:", error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setSelectedFileName(file.name);
  };
  return (
    <>
      {/* Modal */}
      <div className="flex flex-col items-center justify-center text-yellow-500 ">
        <h3 className="pt-4 text-2xl text-center"> Create an Account!</h3>
        <form
          className="relative flex flex-col  bg-black text-white rounded shadow-lg p-12 mt-12 border border-white"
          action=""
        >
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label
                className="block mb-2 text-sm font-bold text-yellow-300"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-yellow-300"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <label
            className="block mb-2 text-sm font-bold text-yellow-300"
            htmlFor="emailField"
          >
            {" "}
            Email
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className="block mb-2 text-sm font-bold text-yellow-300"
            htmlFor="passwordField"
          >
            {" "}
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className="block mb-2 text-sm font-bold text-yellow-300"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-yellow-300"
              htmlFor="bio"
            >
              Bio
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="bio"
              type="text"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-yellow-300"
              htmlFor="photo"
            >
              <span> Photo</span>
            </label>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <button
                className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-300"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              >
                {" "}
                Upload Photo
              </button>
            </div>
          </div>
          <div className="flex flex-row mt-6 justify-center items-center text-xs">
            <IoIosArrowBack className="mr-3" />
            <a
              href="#"
              className="text-blue-499 hover:text-yellow-300"
              onClick={toggleModalMode}
            >
              Back to Login
            </a>
          </div>
          {/* Submit Form Button */}
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-center h-12 px-6 w-64 bg-yellow-500 mt-8 rounded font-semibold  text-blue-100 hover:bg-yellow-300"
              type="submit"
              onClick={handleCreateAccount}
            >
              Create
            </button>
          </div>
          {/* Exit out of modal button */}
          <button
            className=" absolute top-2 right-2 px-2 py-2"
            onClick={closeModal}
          >
            X
          </button>
        </form>
      </div>
    </>
  );
}