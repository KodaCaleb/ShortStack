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
    const [username, setUsername] = useState('Username');
    const [bioInfo, setBioInfo] = useState('Here for the lulz');
  
    const handleImageMouseEnter = () => {
      setIsImageHovered(true);
    };
  
    const handleImageMouseLeave = () => {
      setIsImageHovered(false);
    };
  
    const handleImageClick = (e) => {
      e.preventDefault();
      setIsImageEditable(!isImageEditable);
    };
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      // TODO add code to handle saving image and to use setImage useState
    };
  
    const handleUsernameMouseEnter = () => {
      setIsUsernameHovered(true);
    };
  
    const handleUsernameMouseLeave = () => {
      setIsUsernameHovered(false);
    };
  
    const handleUsernameClick = () => {
      setIsUsernameEditable(!isUsernameEditable);
    };
  
    const handleBioMouseEnter = () => {
      setIsBioHovered(true);
    };
  
    const handleBioMouseLeave = () => {
      setIsBioHovered(false);
    };
  
    const handleBioClick = () => {
      setIsBioEditable(!isBioEditable);
    };
  
    return (
        <div className="h-screen">
            <p className="text-white">This is my account!</p>
        </div>
    )
}

