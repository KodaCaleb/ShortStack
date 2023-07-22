import React from "react";

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col align-center border-2 p-6 border-yellow-400 rounded-2xl justify-center bg-black">
      <h3 className=" bg-yellow-950 rounded-2xl p-4 mt-5 text-center italic">720x1280 resolution or higher 
      <br></br>Up to 5 minutes 
      <br></br>Less than 2 GB</h3>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {!source && <button className="justify-center h-12 px-6  w-full bg-yellow-500 mt-8 rounded font-semibold text-sm text-black hover:bg-yellow-400" onClick={handleChoose}>Select File</button>}
      {source && (
        <video
          className="block m-0 text-white rounded"
          width="100%"
          height={height}
          controls
          src={source}
        />
      )}
      <div className=" min-h-fit leading-10 text-center w-full text-white">{source || "Nothing selected"}</div>
    </div>
  );
}