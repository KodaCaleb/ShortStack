import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { firestore, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import AuthContext from "../utils/AuthContext";

export default function EditAccount() {
  const { user } = useContext(AuthContext);
  console.log("Login status:", user);

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [bio, setBio] = useState("")


  useEffect(() => {
    if (user) {
        const getUserData = async () => {
            try{
                //Get firestore user data with id
                const userDocRef = doc(firestore, "Users", user.uid);

                //Get the snapshot of the document
                const userDocSnapshot = await getDoc(userDocRef)

                if(userDocSnapshot.exists()){
                    const userData = userDocSnapshot.data();

                    setFirstName(userData.firstName || "")
                    setLastName(userData.lastName || "")
                    setBio(userData.bio|| "")
        
                }
            } catch (error){
                console.log("error fetching user data from Firestore:", error)
            }
        };
        getUserData()
    }
  }, [user]);



  // Event handlers for users entering data
  const handleEditAccount = async (e) => {
    e.preventDefault();

    // updateProfile(auth.currentUser, {
    //   displayName: "Jane Q. User",
    //   photoURL: "https://example.com/jane-q-user/profile.jpg",
    // })
    //   .then(() => {
    //     // Profile updated!
    //     // ...
    //   })
    //   .catch((error) => {
    //     // An error occurred
    //     // ...
    //   });
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setPhoto(file);
    //     setSelectedFileName(file.name);
    //   };
  };

  return (
    <>
    {user && user.email ? (
        <div className="flex flex-col items-center justify-center text-yellow-500 ">
        <h3 className="pt-4 text-2xl text-center"> Your Account Info</h3>
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
                value={firstName}
                name="firstName"
                // onChange={(e) => setFirstName(e.target.value)}
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
                // onChange={(e) => setLastName(e.target.value)}
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
            value={user.email}
            // onChange={(e) => setEmail(e.target.value)}
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
            // onChange={(e) => setPassword(e.target.value)}
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
            value={user.displayName}
            // onChange={(e) => setUsername(e.target.value)}
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
            //   onChange={(e) => setBio(e.target.value)}
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
              <input type="file" accept="image/*" style={{ display: "none" }}  />
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

          {/* Edit Account Info Button*/}
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-center h-12 px-6 w-64 bg-yellow-500 mt-8 rounded font-semibold  text-blue-100 hover:bg-yellow-300"
              type="submit"
              onClick={handleEditAccount}
            >
              Edit Account
            </button>
          </div>
        </form>
      </div>
    ) : (
        <div>Loading...</div>
    )}
      
    </>
  );
}
