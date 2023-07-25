// import React, {useState} from "react";
// import SearchVideosByTags from "../utils/SearchBarTags";

// const SearchBar = ({ onSearch }) => {
//     const [searchTag, setSearchTag] = useState("");
//     const handleSearch = async () => {
//       try {
//         if (searchTag.trim() !== "") {
//           const videos = await SearchVideosByTags(searchTag);
//           onSearch(videos);
//         } else {
//           onSearch([]);
//         }
//       } catch (error) {
//         console.error("Error searching videos", error);
//       }
//     };
//     return (
//       <div>
//         <input
//           type="text"
//           value={searchTag}
//           onChange={(e) => setSearchTag(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//     );
//   };
//   export default SearchBar;