import { useState, useRef, useContext } from "react";
import AuthContext from "../utils/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { storage, firestore } from "../firebase";
import TagsInput from "../components/uploadLogic/TagsInput";

export default function VideoInput(props) {
  // State management to store input
// New code added
  const [tags, setTags] = useState([]);
  const [source, setSource] = useState();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { height } = props;
  // console.log("UID in SomeOtherComponent:", uid); // Log the value of uid
  const { user, loading } = useContext(AuthContext)
  // Store the user's ID if available, otherwise set it to null
  const uid = user && !loading ? user.uid : null // This is the global user id reference

  useEffect(() => {
    if (user && uid && !loading) {
      console.log("UID in VideoInput:", uid); // Log the value of uid
    }    
    // Get the current user and loading state from the AuthContext
  }, [user, loading, uid]);

  // Create a ref to the file input element
  const inputRef = useRef();

  // Handle the file input change event
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    // Store the selected file in the state
    setFile(file);
    // Store the video source URL in the state to display the video
    setSource(url);
  };

  // Handle the video upload event
  const handleUpload = async (event) => {
    event.preventDefault();
    // Check if there is a selected file and if an upload is not already in progress
    if (!file || uploading || uploading) {
      console.error("missing data. User ID:", uid);
      return
    };

    // Create a reference to the Firebase storage and start the upload
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Set the uploading state to true during the upload
    setUploading(true);

    // Set up an event listener for the upload task to track the upload progress and handle errors
    uploadTask.on(
      "state_changed",
      (snapshot) => { },
      (error) => {
        console.error("error uploading file", error);
        // Set the uploading state to false in case of an error
        setUploading(false);
      },
      () => {
        // When the upload is complete, get the download URL of the uploaded file
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const videoData = {
            title,
            tags,
            vidRef: downloadURL,
            userId: uid,
            likes: 0,
            createdAt: serverTimestamp(), // Add the created at timestamp field
          };

          // Generate a document reference ID beforehand for the videos collection
          const docRef = doc(collection(firestore, "videos"));

          try {
            // Save the video data in both the 'videos' collection and the user's specific 'userContent' collection
            await setDoc(doc(firestore, "videos", docRef.id), videoData);
            await setDoc(doc(firestore, `Users/${uid}/userContent`, docRef.id), videoData);
            setUploadSuccess(true);
            setTitle("");
            setFile(null);
          } catch (error) {
            // Log any errors that occur during document creation
            console.error("Error adding document", error);
          };

          // Set the uploading state to false after the upload is complete
          setUploading(false);
        });
      }
    );
  };

  // Handle the file selection event when the "Select File" button is clicked
  const handleChoose = () => {
    inputRef.current.click();
  };

  
  //User gets alerted when successful upload and input clears
  useEffect(() => {
    if (uploadSuccess) {
      setTags([])
      setSource("");
      const timeoutId = setTimeout(() => {
        setUploadSuccess(false);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [uploadSuccess]);

  return (
    // Render the video input form
    <form
      onSubmit={handleUpload}
      className="flex flex-col align-center border-2 p-6 border-yellow-400 rounded-3xl justify-center bg-zinc-200 bg-opacity-20"
    >
      <h3
        className=" bg-black text-amber-300 bg-opacity-50 text-opacity-50 rounded-2xl p-6  text-center italic pb-8"
      >
        720x1280 resolution or higher
        <br></br>
        Up to 5 minutes
        <br></br>
        Less than 2 GB
        <br></br>
        Disclaimer: Files that do not adhere to these guidelines may be subject to removal without prior notice.
      </h3>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={handleFileChange}
        accept="video/*"
      />
      <input
        className="bg-black text-white border rounded-md m-4 px-3 py-2"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <TagsInput value={tags} onChange={setTags} />
      {!source &&
        <button
          className="justify-center h-12 px-6 w-full bg-yellow-500 mt-8 rounded font-semibold text-sm text-black hover:bg-yellow-400"
          onClick={handleChoose}
        >
          Select File
        </button>}
      {source && (
        <video
          className="block m-0 text-white rounded"
          width="100%"
          height={height}
          controls
          src={source}
        />
      )}
      <div className="min-h-fit leading-10 text-center w-full text-white text-opacity-40">{source || "Nothing selected"}</div>
      <button type="submit" disabled={uploading} className="justify-center h-12 px-6  w-full bg-yellow-500 mt-8 rounded font-semibold text-sm text-black hover:bg-yellow-400">Upload</button>
      {uploadSuccess && (
        <div className="flex items-center justify-center mt-4 text-green-500">
          Video uploaded successfully!
        </div>
      )}
    </form>
  );
};
