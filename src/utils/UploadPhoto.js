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


};

export default UploadButton;