import PancakeLogo from "../../assets/pancakeLogo.png";
import { useState } from "react";


export default function CollapseMenu() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
        console.log(isMenuOpen);
    }


    return (
        <>
        <img 
            className="h-14 cursor-pointer" 
            src={PancakeLogo} 
            alt=""
            onClick={toggleMenu}
        />
        {isMenuOpen && (
            <div className="absolute top-20 left-0 w-1/4 h-2/3 bg-opacity-50">
                <div className=" top-0 left-0 flex flex-col justify-between bg-black bg-opacity-40 rounded-xl border-white border w-1/2 h-full">
                    <ul className="flex flex-col items-start p-2 justify-start h-auto">
                        <li className="text-white">
                            <a href="/">
                                Following
                            </a>
                        </li>
                        <li className="text-white">
                            <a href="/">
                                Browse/Explore
                            </a>
                        </li>
                        <li className="text-white">
                            <a href="/">
                                Bookmarked
                            </a>
                        </li>
                    </ul>
                    <ul className="p-2 items-start">
                        <li className="text-white">
                            <a href="/">
                                My Account
                            </a>
                        </li>
                        <li className="text-white">
                            <a href="/">
                                Login/Logout
                            </a>
                        </li>
                    </ul>
                </div>    
            </div>
        )}
        </>
    )
}
