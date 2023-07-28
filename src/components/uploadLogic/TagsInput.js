// Import React and useState hook from 'react' package
import React, { useState } from "react";

// TagsInput Component
function TagsInput({ value = [], onChange }) {
  // State to store the current tag being entered
  const [tag, setTag] = useState("");

  // Function to remove a tag when the 'x' button is clicked
  const removeTag = (indexToRemove) => {
    // Call the onChange callback with the updated tag list
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  // Function to add a new tag when the "Add tag" button is clicked
  const addTag = (event) => {
    event.preventDefault();
    // Call the onChange callback with the updated tag list containing the new tag
    onChange([...value, tag]);
    // Clear the current tag state for the next input
    setTag("");
  };

  // Rendering the TagsInput component
  return (
    <div className="flex flex-col justify-center items-start space-y-4">
      <div className="flex flex-wrap space-x-2">
        {/* Display existing tags */}
        {value.map((tag, index) => (
          <button
            key={tag}
            type="button"
            className="inline-flex items-center bg-white  text-black rounded-lg p-2 mt-4 whitespace-nowrap"
            onClick={() => removeTag(index)}
          >
            <span>{tag}</span>
            <span className="pl-2">x</span>
          </button>
        ))}
      </div>
      {/* Input field for adding new tags */}
      <div className="flex flex-row items-center space-x-2 w-full">
        <input
          placeholder="react, javascript, css"
          className="bg-black border text-white flex-grow rounded-md m-4 px-3 py-2"
          value={tag}
          // Update the 'tag' state with the entered value
          onChange={(e) => setTag(e.target.value)}
        />
        {/* Button to add the new tag */}
        <button
          className="bg-yellow-500 rounded-lg p-2 h-1/2"
          type="button"
          onClick={addTag}
        >
          Add tag
        </button>
      </div>
    </div>
  );
};

// Export the TagsInput component as the default export
export default TagsInput;