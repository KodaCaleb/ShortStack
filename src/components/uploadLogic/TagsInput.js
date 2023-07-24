import React, { useState } from 'react';

function TagsInput({ value = [], onChange }) {
  const [tag, setTag] = useState('');

  const removeTag = (indexToRemove) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  const addTag = (event) => {
    event.preventDefault();
    onChange([...value, tag]);
    setTag('');
  };

  return (
    <div>
      {value.map((tag, index) => (
        <button key={tag} onClick={() => removeTag(index)}>
          {tag} x
        </button>
      ))}
      <input value={tag} onChange={(e) => setTag(e.target.value)} />
      <button type="button" onClick={addTag}>Add tag</button>
    </div>
  );
}

export default TagsInput;
