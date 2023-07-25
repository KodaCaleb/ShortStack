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
            type="button"
            className="inline-flex items-center bg-white  text-black rounded-lg p-2 mt-4 whitespace-nowrap"
            onClick={() => removeTag(index)}
          >
            <span>{tag}</span>
            <span className="pl-2">x</span>
          </button>
        ))}
      </div>
      <div className="flex space-x-2 w-full">
        <input
          placeholder="react, javascript, css"
          className="flex-grow rounded-lg p-2"
          value={tag}

          onChange={(e) => setTag(e.target.value)}
        />
        <button
          className="bg-yellow-500 rounded-lg p-2"
          type="submit"
          onClick={addTag}
        >
          Add tag
        </button>
      </div>
    </div>
  );
}

export default TagsInput;
