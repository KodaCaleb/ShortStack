import React, { useEffect, useState } from "react";
import { collection, query, getDocs, doc, where } from "firebase/firestore";
import { firestore } from "../firebase";

export default async function SearchVideosByTags(searchTag) {
  try {
    const videosCollection = collection(firestore, "videos");

    const searchedVideos = query(
      videosCollection,
      where("tags", "array-contains", searchTag)
    );
    const querySnapshot = await getDocs(searchedVideos);

    // Process the query result
   const matchingVideos = querySnapshot.docs.map((doc) => doc.data())
        return matchingVideos

  } catch (error) {
    console.error("Error searching videos", error);
    return [];
  }
}
