// Import React and useState hook from 'react' package
import React, { useState } from "react";
// Import specific functions and objects from Firebase packages
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, firestore } from "../../firebase";

// VideoUpload Component
export default function VideoUpload() {
  // State variables to manage the upload behavior
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  // Function to handle file selection change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  // Function to handle video upload
  const handleUpload = async (e) => {
    e.preventDefault();
    // Check if a file is selected or if uploading is already in progress
    if (!file || uploading) return;

    // Create a reference in Firebase Storage for the selected file
    const storageRef = ref(storage, file.name);
    
    // Start the upload task
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Set uploading state to true to prevent user from uploading again
    setUploading(true);

    // listen to state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
      // Use this part to show progress bar (not implemented in the provided code)
      },
      (error) => {
        console.log("error uploading file", error);
        // If there's an error, set uploading state back to false
        setUploading(false);
      },
      () => {
        // Once the file is uploaded, get the download URL of the file
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // Create an object with video data to be added to Firestore
          const videoData = {
            title,
            vidRef: downloadURL,
          };

          try {
            // Add the videoData object to the "videos" collection in Firestore
            await addDoc(collection(firestore, "videos"), videoData);
          } catch (error) {
            console.error("Error adding document", error);
          }

          // Set uploading state back to false as the upload is complete
          setUploading(false);
        });
      }
    );
  };

  // Rendering the VideoUpload component
  return (
    <form onSubmit={handleUpload}>
      {/* Input field for file selection */}
      <input
        type="file"
        onChange={handleFileChange}
        accept="video/*"
        required
      />
      {/* Input field for video title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      {/* Button to trigger the video upload */}
      <button
        type="button"
        disabled={uploading}>
        Upload
      </button>
    </form>
  );
};
