import React, { useState } from "react";

function TagsInput({ value = [], onChange }) {
  const [tag, setTag] = useState("");

  const removeTag = (indexToRemove) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  const addTag = (event) => {
    event.preventDefault();
    onChange([...value, tag]);
    setTag("");
  };

  return (
    <div className="flex flex-col justify-center items-start space-y-4">
      <div className="flex flex-wrap space-x-2">
        {value.map((tag, index) => (
          <button
            key={tag}
            className="inline-flex items-center bg-white  text-black rounded-lg p-2 mt-4 whitespace-nowrap"
            onClick={() => removeTag(index)}
          >
            <span>{tag}</span>
            <span className="pl-2">x</span>
          </button>
        ))}
      </div>
      <div className="flex flex-row items-center space-x-2 w-full">
        <input
        
          placeholder="react, javascript, css"
          className="bg-black border  flex-grow rounded-md m-4 px-3 py-2"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
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
}

export default TagsInput;
