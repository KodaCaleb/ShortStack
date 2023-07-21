import React from "react";
import { useState } from "react";
import { firestore } from "../../firebase";
import { IoIosArrowBack} from "react-icons/io";
import { collection, addDoc, doc, setDoc } from "firebase/firestore"

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

    if(!firstName || !lastName || !email || !password || !username || !bio){
      alert("Please fill in all required fields");
      return;
    }

    const userId = Math.floor( Math.random() * 100)

    try{
      const userDoc = doc(firestore,"Users", `${userId}`, "userInfo", "account")
      // const usersCollection = collection(firestore, `Users/${userId}/userInfo`);
      await setDoc(userDoc, accountData);
      console.log("user data added to firestore", accountData);
    }catch (error){
      console.log("error adding user data to firestore", error)
    }
  };

  //Object for user data 
  const accountData = {
    firstName,
    lastName,
    email,
    password
  }
  const profileData = {
    username,
    bio,
    photo
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setSelectedFileName(file.name)
  }
  
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
            <div class="mb-4 md:mr-2 md:mb-0">
              <label
                class="block mb-2 text-sm font-bold text-yellow-300"
                for="firstName"
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
                class="block mb-2 text-sm font-bold text-yellow-300"
                for="lastName"
              >
                Last Name
              </label>
              <input
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
            for="emailField"
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
            for="passwordField"
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
              class="block mb-2 text-sm font-bold text-yellow-300"
              for="username"
            >
              Username
            </label>
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="mb-4">
            <label
              class="block mb-2 text-sm font-bold text-yellow-300"
              for="bio"
            >
              Bio
            </label>
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="bio"
              type="text"
              placeholder="Bio"
              value={lastName}
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
                accept= "image/*"
                onChange={handleImageChange}
                style={{ display: "none" }} 
              />
              <button
              className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-300" onClick={() => document.querySelector('input[type="file"]').click()}> Upload Photo

              </button>
              </div>
            
          </div>
          <div className="flex flex-row mt-6 justify-center items-center text-xs">
        <IoIosArrowBack className="mr-3"/>
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
