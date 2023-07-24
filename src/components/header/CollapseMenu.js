import unclickedLogo from "../../assets/unclickedStack.svg";
import clickedLogo from "../../assets/clickedStack.svg";
import { HandleLogout } from "../../utils/LoginLogout";
import { useState, useContext } from "react";
import AuthContext from "../../utils/AuthContext";

export default function CollapseMenu() {
  const { isLoggedIn } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (isMenuOpen) => {
    setIsMenuOpen(isMenuOpen);
  };

  return (
    <>
      <div>
        <ul className="main p-0 relative list-none inline-block"
          onMouseEnter={() => toggleMenu(true)} // When the mouse enters, set isMenuOpen to true
          onMouseLeave={() => toggleMenu(false)} // When the mouse leaves, set isMenuOpen to false
        >
          <li className="relative inline-block  mr-2 cursor-pointer z-5 w-20">
            {isMenuOpen ? (
              <img className="h-14 w-11/12 cursor-pointer " src={clickedLogo} alt="stack of pancakes with syrup" />
            ) : (
              <img className="h-14 w-11/12 cursor-pointer " src={unclickedLogo} alt="stack of pancakes" />
            )}

            {isLoggedIn ? (
              <ul className="drop top-12 list-none absolute left-0 z-10">
                <div className="relative p-2 ">
                  <li className="text-white text-center block p-0 align-middle rounded-lg mt-3">
                    <a href="/">Following</a>
                  </li>
                  <li className="text-white  block p-0 w-full align-middle text-center rounded-lg mt-3">
                    <a href="/">Explore</a>
                  </li>
                  <li className="text-white text-center block p-0 w-full align-middle rounded-lg mt-3">
                    <a href="/favorites">Favorites</a>
                  </li>
                  <li className="text-white text-center block p-0 w-full align-middle rounded-lg mt-3">
                    <a href="/Upload">Upload</a>
                  </li>
                  <li className="text-white  block p-0 w-full align-middle text-center rounded-lg mt-3">
                    <a href="/profile">Profile</a>
                  </li>
                  <li className="text-white  block p-0 w-full align-middle text-center rounded-lg mt-3">
                    <a href="/account">Account</a>
                  </li>
                  <li className="text-white text-center block p-0 w-full align-middle rounded-lg mt-3">
                    <a onClick={HandleLogout} >Logout</a>
                  </li>
                </div>
              </ul>
            ) : (
              <ul className="drop top-12 list-none absolute left-0 z-10">
                <div className="relative p-2 ">
                  <li className="text-white  block p-0 w-full align-middle text-center rounded-lg mt-3">
                    <a href="/">Explore</a>
                  </li>
                  <li className="text-white text-center block p-0 w-full align-middle rounded-lg mt-3">
                    <a href="/login">Login</a>
                  </li>
                </div>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}