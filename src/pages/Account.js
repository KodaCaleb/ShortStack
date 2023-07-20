import React from 'react';
import { FaPencilArt } from 'react-icons/fa';
import PostContainer from "../components/VideoContainer/PostContainer"

export default function Account() {
    const [isImageHovered, setIsImageHovered] = useState(false);
    const [isImageEditable, setIsImageEditable] = useState(false);
    const [isUsernameHovered, setIsUsernameHovered] = useState(false);
    const [isUsernameEditable, setIsUsernameEditable] = useState(false);
    const [isBioHovered, setIsBioHovered] = useState(false);
    const [isBioEditable, setIsBioEditable] = useState(false);

    const[image, setImage] = useState(
        process.env.PUBLIC_URL + '/pancakeholder.img.png'
    );

    return (
        <div className="h-screen">
            <p className="text-white">This is my account!</p>
        </div>
    )
}

