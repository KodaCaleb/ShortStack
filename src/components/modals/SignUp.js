import { useState } from "react";
import { firestore, auth, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { IoIosArrowBack } from "react-icons/io";
import { MoonLoader } from "react-spinners";
// import UploadPhoto from "../../utils/UploadPhoto";

export default function SignUpModal({ closeModal, toggleModalMode }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Firestore DB
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [devRole, setDevRole] = useState("Enter your role as a developer here!");

  // Authenticator DB
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoData, setPhotoData] = useState(process.env.PUBLIC_URL + "/pancakeholder.img.png");

  const handleButtonClick = () => {
    document.querySelector('input[type="file"]').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPhotoData(file);
  };

  // Event handlers for users entering data
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (
      !firstName ||
      !lastName ||
      !displayName ||
      !email ||
      !password ||
      !phoneNumber
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Creates a new user in the Firebase authenticator
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;

      if (photoData) {
        // Upload the user's profile photo to Firebase Storage
        const photoRef = ref(
          storage,
          `profilePictures/${user.uid}/${photoData.name}`
        );
        await uploadBytes(photoRef, photoData);

        // Get the download URL of the uploaded photo
        const photoURL = await getDownloadURL(photoRef);
        
        // Add additional user information to Firestore DB
        const userInfo = {
          firstName,
          lastName,
          devRole,
          photoURL,
        };
        addUserToFirestore(uid, userInfo);
        
        // Update the user's displayName, phoneNumber, and photoURL
        await updateProfile(user, {
          displayName: displayName,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
        });
      } else {
        // Update the user's displayName, phoneNumber
        await updateProfile(user, {
          displayName: displayName,
          phoneNumber: phoneNumber,
        });
      }
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      const warning = { errorCode, errorMessage };
      alert(warning);
    }
  };

  // Sending user input to create account and profile document
  const addUserToFirestore = async (uid, userInfo) => {
    try {
      // Reference the "Users" collection in Firestore
      const usersCollection = collection(firestore, "Users");
      const userDocRef = doc(usersCollection, uid);

      // Add the user data to Firestore using the uid as the document ID
      await setDoc(userDocRef, userInfo);
    } catch (error) {
      alert("Error adding user data to Firestore:", error);
    }

    // Close modal after successful account creation
    closeModal();
  };
  return (
    <>
      {isLoading && (
        <div className=" z-index-25 flex items-center justify-center">
          <MoonLoader color="#E0A712" loading={isLoading} size={80} />
        </div>
      )}
      {/* Modal */}
      <div className="flex flex-col items-center justify-start text-yellow-500 ">
        <h3 className="pt-4 text-2xl text-center"> Create an Account!</h3>
        <form
          className="relative flex flex-col  bg-black text-white rounded shadow-lg p-12 pb-4 mt-6 border border-white"
          action=""
        >
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0">
              {/* First Name */}
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
              {/* Last Name */}
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

          {/* Email */}
          <div className="flex w-full flex-row">
            <div className="pr-4">
              <label
                className="block mb-2 text-sm font-bold text-yellow-300"
                htmlFor="emailField"
              >
                {" "}
                Email
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pl-4">
              <label
                className="block mb-2 text-sm font-bold text-yellow-300"
                htmlFor="phoneNumberField"
              >
                {" "}
                Phone Number
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="tel"
                id="phoneNumberField"
                name="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Username */}
          <div className="w-full flex flex-row">
            <div className="pr-4">
              <label
                className="flex mb-2 text-sm font-bold text-yellow-300"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full  px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            {/* Password */}
            <div className="pl-4 ">
              <label
                className=" mb-2 text-sm font-bold flex text-yellow-300"
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
            </div>
          </div>
          {/* Phone Number */}

          {/* Bio */}
          <div className="flex w-full mt-4 items-center flex-col">
            <button
              className="bg-yellow-400 h-12 w-52 text-sm text-black px-3 py-2 rounded-lg hover:rounded-3xl hover:bg-yellow-500 focus:ring-1 focus:ring-yellow-800 ease-in-out duration-500"
              type="button"
              onClick={handleButtonClick}
            >
              Upload Photo
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {selectedFile && (
              <>
                <p className='text-sm'>File Selected:</p>
                <p>{selectedFile.name}</p>
              </>
            )}
            <div className="flex items-center p-4 justify-center">
              <button
                className="flex items-center justify-center h-12 px-6 w-52 focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg focus:border-2  focus:border-white dark:focus:ring-yellow-900
              hover:rounded-3xl
              hover:border-2
              hover:border-amber-700
              hover: ease-in-out duration-300"
                type="submit"
                onClick={handleCreateAccount}
              >
                Create
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
