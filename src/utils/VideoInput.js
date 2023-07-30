import React, { useState, useRef, useEffect, useContext } from "react"; // import the useContext method
import AuthContext from "../utils/AuthContext"; // import AuthContext method also for global state setup
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { storage, firestore } from "../firebase";
import TagsInput from "../components/uploadLogic/TagsInput";

export default function VideoInput(props) {
  // State management to store input
  // New code added
  const [tags, setTags] = useState([]);
  const [source, setSource] = useState();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Nothing selected")
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setFile(file);
    setSource(url);
    setFileName(file.name)

  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file || uploading || uploading) {
      console.log("missing data. User ID:", uid);
      return
    }

    // Generate a unique file name using a combination of timestamp and user ID
    const uniqueFileName = `${Date.now()}_${uid}_${file.name}`;

    const storageRef = ref(storage, uniqueFileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => { },
      (error) => {
        console.log("error uploading file", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const videoData = {
            title,
            tags,
            vidRef: downloadURL,
            userId: uid,
            likes: 0,
          };

          // Generate a document reference ID beforehand
          const docRef = doc(collection(firestore, "videos"));

          try {
            await setDoc(doc(firestore, "videos", docRef.id), videoData);
            await setDoc(doc(firestore, `Users/${uid}/userContent`, docRef.id), videoData);
            setUploadSuccess(true);
            setTitle("");
            setFile(null);
          } catch (error) {
            console.log("Error adding document", error);
          }
          setUploading(false);
        });
      }
    );
  };

  const handleChoose = () => {
    inputRef.current.click();
  };


  //User gets alerted when successful upload and input clears
  useEffect(() => {
    if (uploadSuccess) {
      setTags([])
      setFileName("");
      setSource("");
      const timeoutId = setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [uploadSuccess]);

  return (
    <form className="flex flex-col border-2 p-6 border-yellow-400 rounded-3xl bg-zinc-200 bg-opacity-20">
      <div className="flex flex-row fle">
        <div className="flex flex-col min-w-[33%] justify-center items-center">
          {source && (
            <video
              className="w-3/4 block text-white rounded"
              width="100%"
              height={height}
              controls
              src={source}
            />
          )}
          <input
            ref={inputRef}
            className="hidden"
            type="file"
            onChange={handleFileChange}
            accept="video/*"
          />
          <div
            className="w-2/3 text-center text-white text-opacity-40"
          >
            {fileName || "Nothing selected"}
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <h3 className="bg-black w-11/12 text-amber-300 bg-opacity-50 text-opacity-50 rounded-2xl p-3 text-center italic">
            Video Uploading Guidelines
            <br></br>
            <br></br>
            1. Resolution: 720x1280 or higher
            <br></br>
            2. Duration: Up to 5 minutes
            <br></br>
            3. File Size: Less than 2 GB
            <br></br>
            <br></br>
            Non-compliant videos may be removed without notice.
            <br></br>
            <br></br>
            Thank you for your cooperation.
          </h3>
          <input
            className="bg-black text-white border rounded-md m-4 px-3 py-2 w-11/12"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <div className="w-11/12">
            <TagsInput value={tags} onChange={setTags} />
          </div>
          <div className="flex justify-evenly w-11/12">
            {!source &&
              <button
                type="button"
                className="
              w-1/3
              mt-4
              h-12 px-6
              bg-yellow-500 
              rounded 
              font-semibold 
              text-sm 
              text-black 
              hover:bg-yellow-400
              "
                onClick={handleChoose}>
                Select File
              </button>
            }
            <button
              type="button"
              disabled={uploading}
              onClick={handleUpload}
              className="
              w-1/3
              mt-4
              h-12 
              px-6 
              bg-yellow-500 
              rounded 
              font-semibold 
              text-sm 
              text-black 
              hover:bg-yellow-400"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
      {uploadSuccess && (
        <div className="flex items-center justify-center mt-4 text-green-500">
          Video uploaded successfully!
        </div>
      )}
    </form>
  );
}
