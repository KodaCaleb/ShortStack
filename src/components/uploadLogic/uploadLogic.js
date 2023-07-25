import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, firestore } from "../../firebase";

export default function VideoUpload() {
  const [file, setFile] = useState(null);
  const { title, setTitle } = useState("");
  const { uploading, setUploading } = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || uploading) return;

    const storageRef = ref(storage, file.name); // create a reference in Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file); // start the upload task

    setUploading(true); // set uploading state to true to prevent user from uploading again

    // listen to state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // use this part to show progress bar
      },
      (error) => {
        console.log("error uploading file", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // once file is uploaded, add document to firestore
          const videoData = {
            title,
            vidRef: downloadURL,
          };

          try {
            await addDoc(collection(firestore, "videos"), videoData);
          } catch (error) {
            console.log("Error adding document", error);
          }
          setUploading(false);
        });
      }
    );
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        onChange={handleFileChange}
        accept="video/*"
        required
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <button type="submit" disabled={uploading}>
        Upload
      </button>
    </form>
  );
}
