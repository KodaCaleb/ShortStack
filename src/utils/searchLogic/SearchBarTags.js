import { collection, query, getDocs, where } from "firebase/firestore";
import { firestore } from "../../firebase";

// Function to search videos in Firestore by tags
export default async function SearchVideosByTags(searchTag) {
  try {
    // Get the Firestore collection reference for "videos"
    const videosCollection = collection(firestore, "videos");

    // Create a query to search for videos where the "tags" array contains the specified searchTag
    const searchedVideos = query(
      videosCollection,
      where("tags", "array-contains", searchTag)
    );

    // Execute the query and get the query snapshot
    const querySnapshot = await getDocs(searchedVideos);

    // Process the query result and format the data into an array of matching videos
    const matchingVideos = querySnapshot.docs.map((doc, index) => ({
      id: doc.id ? doc.id : index,
      ...doc.data(),
    }));

    // Return the array of matching videos
    return matchingVideos;
  } catch (error) {
    // Handle errors during the search process
    console.error("Error searching videos", error);
  };

  // Return an empty array if an error occurs or no matching videos are found
  return [];
};
