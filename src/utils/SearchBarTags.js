import React, { useEffect, useState } from "react";
import { collection, query, getDocs, doc, where } from "firebase/firestore";
import { firestore } from "../firebase";


export default function SearchVideosByTags() {

    const [searchTag, setSearchTag] = useState("")
    const [matchingVideos, setMatchingVideos ] = useState([])
    const searchVideos = async (searchTag) => {
        try {
            const videosCollection = collection(firestore, "videos");
            const searchedVideos = query(videosCollection, where("", "", searchTag));
            const querySnapshot = await getDocs(searchedVideos);

            //Process the query result

            const matchingVideos = [];
            querySnapshot.forEach((doc) => {
                const videoData = doc.data();

                matchingVideos.push(videoData)
            });
            return matchingVideos
        } catch (error) {
            console.error("error searching videos", error)
            return []
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        searchVideos(searchTag)
    }
return(
    // For testing searching, switch with navbar search input
    <>
    <input
    value={searchTag}
    onChange={(e) => setSearchTag(e.target.value)}
    />
 <button onClick={handleSearch}></button>

{/* map matching.videos */}
 
 </>
)
}

