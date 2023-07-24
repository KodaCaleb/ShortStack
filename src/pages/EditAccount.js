import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { firestore, auth } from "../firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import AuthContext from "../utils/AuthContext";
import { FaPencilAlt } from "react-icons/fa";

export default function EditAccount() {
  const { user } = useContext(AuthContext);
  console.log("Login status:", user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

//   storing the updated input values
    const [updateFirsName , setUpdatedFirstName ] = useState("");
    const [updatedLastName, setUpdatedLastName ] = useState("");
    const [updatedBio, setUpdatedBio ] = useState("");
    


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
          console.log("error fetching user data from Firestore:", error);
        }
      };
      getUserData();
    }
  }, [user]);

  // Event handlers for users entering data
  const handleEditAccount = async (e) => {
    e.preventDefault();
    try{
        const userDocRef = doc(firestore, "Users", user.uid)

        //update the document with the new data 
    }


  };

  return (
    <>
      {user && user.email ? (
        <div className="flex flex-col items-center justify-center text-yellow-500  mt-9">
          <h2 className="pt-4 text-4xl text-center"> Your Account Info</h2>
          <form
            className="relative flex flex-col bg-black text-white rounded shadow-lg p-12 mt-12 border border-white"
            action=""
          >
            {/* FirstName Edit Box */}
            <div className=" flex flex-row items-center mb-4">
              <label
                className="block text-sm font-bold text-white w-1/4 pr-4 "
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className=" flex-grow px-3 py-2 text-sm leading-tight text-yellow-600 bg-transparent border-b border-yellow-400 appearance-none focus:outline-none"
                id="firstName"
                type="text"
                value={firstName}
                name="firstName"
                // onChange={(e) => setFirstName(e.target.value)}
              />
              <FaPencilAlt className="text-yellow-400 ml-2 cursor-pointer" />
            </div>

            {/* LastName Edit Box */}
            <div className=" flex flex-row items-center mb-4">
              <label
                className="block text-sm font-bold text-white w-1/4 pr-4 "
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="flex-grow px-3 py-2 text-sm leading-tight text-yellow-600 bg-transparent border-b border-yellow-400 appearance-none focus:outline-none"
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                // onChange={(e) => setLastName(e.target.value)}
              />
              <FaPencilAlt className="text-yellow-400 ml-2 cursor-pointer" />
            </div>

            {/* Email Edit Box */}
            <div className=" flex flex-row items-center mb-4">
              <label
                className="block mb-2 text-sm font-bold text-white w-1/4 pr-4 "
                htmlFor="emailField"
              >
                {" "}
                Email
              </label>
              <input
                className="flex-grow px-3 py-2 text-sm leading-tight text-yellow-600 bg-transparent border-b border-yellow-400 appearance-none focus:outline-none"
                type="email"
                placeholder="Email"
                value={user.email}
                // onChange={(e) => setEmail(e.target.value)}
              />
              <FaPencilAlt className="text-yellow-400 ml-2 cursor-pointer" />
            </div>

            {/* Password Edit Box */}
            <div className=" flex flex-row items-center mb-4">
            <label className="block mb-2 text-sm font-bold text-white w-1/4 pr-4 ">
              {" "}
              Password
            </label>
            <input
              className="flex-grow px-3 py-2 text-sm leading-tight text-yellow-600 bg-transparent border-b border-yellow-400 appearance-none focus:outline-none"
              type="password"
              placeholder="Password"
              // onChange={(e) => setPassword(e.target.value)}
            />
            <FaPencilAlt className="text-yellow-400 ml-2 cursor-pointer" />
            </div>

            {/* Username Edit Box */}
            <div className=" flex flex-row items-center mb-4">
            <label
              className="block mb-2 text-sm font-bold text-white w-1/4 pr-4 "
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="flex-grow px-3 py-2 text-sm leading-tight text-yellow-600 bg-transparent border-b border-yellow-400 appearance-none focus:outline-none"
              id="username"
              type="text"
              placeholder="Username"
              value={user.displayName}
              // onChange={(e) => setUsername(e.target.value)}
            />
             <FaPencilAlt className="text-yellow-400 ml-2 cursor-pointer" />
            </div>


            {/* Username Edit Box */}
            <div className="flex flex-row items-center mb-4">
              <label
                className="block mb-2 text-sm font-bold text-white w-1/4 pr-4 "
                htmlFor="bio"
              >
                Bio
              </label>
              <input
                className="flex-grow px-3 py-2 text-sm leading-tight text-yellow-600 bg-transparent border-b border-yellow-400 appearance-none focus:outline-none"
                id="bio"
                type="text"
                placeholder="Bio"
                value={bio}
                //   onChange={(e) => setBio(e.target.value)}
              />
               <FaPencilAlt className="text-yellow-400 ml-2 cursor-pointer" />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-white"
                htmlFor="photo"
              >
                <span> Photo</span>
              </label>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <button
                  className="bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-300"
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
                className="flex items-center justify-center h-12 px-6 w-50 bg-yellow-600 mt-8 rounded font-semibold  text-blue-100 hover:bg-yellow-300"
                type="submit"
                onClick={handleEditAccount}
              >
                Update Account Info
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
