import React from "react";

export default function VideoFooter() {
  return (
  <div className="relative flex ml-3 mr-3 text-white bottom-14">
    <div className="flex-1">
      <h3>@handle_Name</h3>
      <p>This is a description.</p>
      <p>This is a description.</p>
      <p>This is a description.</p>
    </div>
    <img 
    className="videoFooter_icon h-12 filter invert" 
    src="https://static.thenounproject.com/png/934821-200.png" alt=""
    />
  </div>
  );
}
