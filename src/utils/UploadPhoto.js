import React, { useState } from 'react';

const UploadButton = () => {
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleButtonClick = () => {
        document.querySelector('input[type="file"]').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFileName(file.name); // Update the state with the selected file name
        console.log(file);
    };

    return (
        <div className="flex flex-col p-4 items-center">
            <button
                className="bg-yellow-400 h-12 w-52 text-sm text-black px-3 py-2 rounded-lg hover:rounded-3xl hover:bg-yellow-500 focus:ring-1 focus:ring-yellow-800 ease-in-out duration-500"
                type="button"
                onClick={handleButtonClick}
            >
                Upload Photo
            </button>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            {selectedFileName && (
                <p className='text-sm'>File Selected: {selectedFileName}</p>
            )}
        </div>
    );
};

export default UploadButton;