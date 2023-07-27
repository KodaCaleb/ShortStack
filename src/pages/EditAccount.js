import { useState, useEffect, useContext, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../firebase";
import { setDoc, doc, } from "firebase/firestore";
import AuthContext from "../utils/AuthContext";
import { updateProfile } from "firebase/auth";
import { UserDeleteAccount } from "../utils/UserDeleteAccount";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../utils/ForgotPassword";

export default function EditAccount() {
  // Setting global state variables
  const { userData, isLoggedIn, currentUser } = useContext(AuthContext);

  //For redirecting user when they exit out
  const navigate = useNavigate();

  //Storing the updated input values
  const [updatedFirstName, setUpdatedFirstName] = useState(userData?.firstName || "");
  const [updatedLastName, setUpdatedLastName] = useState(userData?.lastName || "");
  const [updatedDevRole, setUpdatedDevRole] = useState(userData?.devRole || "");
  const [updatedPhotoURL, setUpdatedPhotoURL] = useState(userData?.photoURL || process.env.PUBLIC_URL + "/pancakeholder.img.png");
  const [updatedEmail, setUpdatedEmail] = useState(currentUser?.email || "");
  const [updatedUsername, setUpdatedUsername] = useState(currentUser?.displayName || "");
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [updatedFile, setUpdatedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUpdatedFirstName(userData?.firstName || "");
    setUpdatedLastName(userData?.lastName || "");
    setUpdatedDevRole(userData?.devRole || "");
    setUpdatedPhotoURL(userData?.photoURL || "")
    setUpdatedEmail(currentUser?.email || "");
    setUpdatedUsername(currentUser?.displayName || "");
  }, [userData, currentUser]);

  // Event handler for updating account information
  const handleEditAccount = async (e) => {
    e.preventDefault();
    try {
      if (isLoggedIn && currentUser) {
        const userDocRef = doc(firestore, "Users", currentUser.uid);

        if (updatedFile) {
          // Upload the file to Firebase Storage
          const storageRef = ref(storage, `profilePictures/${currentUser.uid}/${updatedFile.name}`);
          await uploadBytes(storageRef, updatedFile);

          // Get the download URL of the uploaded photo
          const photoURL = await getDownloadURL(storageRef);

          const updatedFirestoreData = {
            firstName: updatedFirstName,
            lastName: updatedLastName,
            devRole: updatedDevRole,
            photoURL: photoURL,
          };
          await setDoc(userDocRef, updatedFirestoreData, { merge: true });

          // Update the state with the new photo URL
          setUpdatedPhotoURL(photoURL);
        } else {

          const updatedFirestoreData = {
            firstName: updatedFirstName,
            lastName: updatedLastName,
            devRole: updatedDevRole,
          };
          await setDoc(userDocRef, updatedFirestoreData, { merge: true });
        }

        // After updating Firestore data, update the photoURL in Firebase Auth
        await updateProfile(currentUser, { displayName: updatedUsername });
      }

      // Showing user if successful update
      setIsUpdateSuccess(true);
      setTimeout(() => setIsUpdateSuccess(false), 2000);
    } catch (error) {
      alert(error);
    }

  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdatedFile(file);
    setSelectedFileName(file ? file.name : "");
  };

  // Get the delete account function from the custom hook
  const handleDeleteAccount = UserDeleteAccount();

  const handleExit = () => {
    navigate('/')
  };

  return (
    <>
      <h3 className="text-white text-center text-3xl p-3">
        {" "}
        Account Information
      </h3>
      <div className="w-3/4 ml-auto mr-auto z-40">
        <form className="border-2 p-6 border-yellow-400 rounded-3xl justify-center bg-zinc-200 bg-opacity-20">
          <div className="relative bg-black text-amber-300 bg-opacity-50 text-opacity-50 rounded-2xl p-6 text-center italic">
            <button className="absolute top-2 right-2 px-2 py-2" onClick={handleExit}>X</button>

            <div className="flex justify-around items-center">
              {/* Password Reset */}
              <div className="text-blue-499 hover:text-yellow-300">
                <ForgotPassword />
              </div>

              <div className="flex flex-col justify-center">
                <div className="rounded-full px-4 max-w-[145px] max-h-[145px] border border-white bg-yellow-400">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <img
                      src={updatedPhotoURL}
                      alt="Profile Photo"
                      type="button"
                      className="w-full h-full object-cover rounded-full"
                      onClick={() => fileInputRef.current.click()}
                    />
                  </label>
                </div>
                {selectedFileName && <div className="text-xs">{selectedFileName}</div>}
              </div>

              {/* Email Reset */}
              <button className="p-3 text-blue-499 hover:text-yellow-300">
                Reset Email
              </button>
            </div>

            <div className="flex md:flex md:justify-between">
              <div className="flex flex-col items-center">
                {/* FirstName */}
                <div>
                  <label htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={updatedFirstName || ""}
                    onChange={(e) => setUpdatedFirstName(e.target.value)}
                  />
                </div>

                {/* LastName */}
                <div className="mt-5">
                  <label htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={updatedLastName || ""}
                    onChange={(e) => setUpdatedLastName(e.target.value)}
                  />
                </div>

              </div>


              <div className="flex flex-col items-center md:flex md:justify-between">
                {/* Username */}
                <div>
                  <label htmlFor="userName">
                    Username
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="Username"
                    type="text"
                    placeholder="Username"
                    value={updatedUsername}
                    onChange={(e) => setUpdatedUsername(e.target.value)}
                  />
                </div>

                {/* Developer Role  */}
                <div className="mt-5">
                  <label htmlFor="devRole">
                    {" "}
                    Dev Role
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Developer Role"
                    value={updatedDevRole || ""}
                    onChange={(e) => setUpdatedDevRole(e.target.value)}
                  />
                </div>

              </div>
            </div>

            {/* SaveChanges and Delete Account Buttons */}
            <div className="flex items-center justify-center">
              <button
                className="flex items-center justify-center h-8 px-6 w-64 bg-yellow-500 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-yellow-300
              hover:rounded-3xl
              hover:border-2
              hover:border-amber-700
              hover:w-80 ease-in-out duration-300"
                onClick={handleEditAccount}
              >
                Save Changes
              </button>
            </div>
            {isUpdateSuccess && (
              <div className="flex items-center justify-center mt-4 text-green-500">
                Account updated successfully!
              </div>
            )}
            <div className="flex mt-3 justify-center text-xs">
              <button
                type="button"
                className="text-blue-499 hover:text-yellow-300"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
