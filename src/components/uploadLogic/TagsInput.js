import React, { useState } from "react";

export default function TagsInput({ value = [], onChange }) {
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
    <div>
      {value.map((tag, index) => (
        <button key={tag} onClick={() => removeTag(index)}>
          {tag} x
        </button>
      ))}
      <form onSubmit={addTag}>
        <input value={tag} onChange={(e) => setTag(e.target.value)} />
        <button type="submit">Add tag</button>
      </form>
    </div>
  );
}
