import React, { useState, useRef, useEffect, useContext } from "react"; // import the useContext method
import AuthContext from "../utils/AuthContext"; // import AuthContext method also for global state setup
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, firestore } from "../firebase";
import TagsInput from "../components/uploadLogic/TagsInput";

export default function VideoInput(props) {
  const [tags, setTags] = useState([]);
  const { width, height } = props;

  // console.log("UID in SomeOtherComponent:", uid); // Log the value of uid
  const { user, loading } = useContext(AuthContext)
  const uid = user && !loading ? user.uid : null // This is the global user id reference

  useEffect(() => {
    if (user && uid && !loading) {
      console.log("UID in VideoInput:", uid); // Log the value of uid
    }
  }, [user, loading, uid]);
  
  const [source, setSource] = useState();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);


  const inputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setFile(file);
    setSource(url);

  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file || uploading || uploading) {
      console.log("missing data. User ID:", uid);
      return
    }

    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log("error uploading file", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const videoData = {
            title,
            description,
            tags,
            vidRef: downloadURL,
            userId: uid,
            likes: 0,
          };

          try {
            await addDoc(collection(firestore, "videos"), videoData);
            await addDoc(collection(firestore, `Users/${uid}/userContent`), videoData)
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

  return (
    <form onSubmit={handleUpload} className="flex flex-col align-center border-2 p-6 border-yellow-400 rounded-3xl justify-center bg-black">
      <h3 className=" bg-yellow-950 rounded-2xl p-4 mt-5 text-center italic">720x1280 resolution or higher 
      <br></br>Up to 5 minutes 
      <br></br>Less than 2 GB</h3>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={handleFileChange}
        accept="video/*"
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <TagsInput value={tags} onChange={setTags} />
      {!source && <button className="justify-center h-12 px-6  w-full bg-yellow-500 mt-8 rounded font-semibold text-sm text-black hover:bg-yellow-400" onClick={handleChoose}>Select File</button>}
      {source && (
        <video
          className="block m-0 text-white rounded"
          width="100%"
          height={height}
          controls
          src={source}
        />
      )}
      <div className="min-h-fit leading-10 text-center w-full text-white">{source || "Nothing selected"}</div>
      <button type="submit" disabled={uploading} className="justify-center h-12 px-6  w-full bg-yellow-500 mt-8 rounded font-semibold text-sm text-black hover:bg-yellow-400">Upload</button>
    </form>
  );
}
