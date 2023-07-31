// Importing necessary dependencies and assets
import unclickedLogo from "../../assets/unclickedStack.svg";
import clickedLogo from "../../assets/clickedStack.svg";
import AuthContext from "../../utils/AuthContext";
import HomeLink from "../../utils/HomeLink";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Declaring the functional component 'CollapseMenu'
export default function CollapseMenu({ openModal }) {
  // Accessing isLoggedIn state from the AuthContext using useContext hook
  const { isLoggedIn, logout } = useContext(AuthContext);

  // Setting up a local state to keep track of the menu open/closed state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initializing the navigate function from the 'react-router-dom' library
  const navigate = useNavigate();

  // Function to toggle the menu open/closed state
  const toggleMenu = (isMenuOpen) => {
    setIsMenuOpen(isMenuOpen);
  };

  // Function to handle opening the modal
  const handleOpenModal = () => {
    openModal();
  }

  const handleLogoutClick = async () => {
    await logout(); // Call the logout function from AuthContext
    navigate("/"); // Redirect to the homepage after logout
  };

  return (
    <div>
      {/* Main menu */}
      <ul className="main p-0 relative list-none inline-block">
        {/* Menu item with logo */}
        <li className="relative mr-2 cursor-pointer z-5 w-20"
          onMouseEnter={() => toggleMenu(true)}
          onMouseLeave={() => toggleMenu(false)}
        >
          {/* Logo image that changes based on the 'isMenuOpen' state */}
          <img className="pancake-image p-3 cursor-pointer"
            src={isMenuOpen ? clickedLogo : unclickedLogo}
            alt={isMenuOpen ? "stack of pancakes with syrup" : "stack of pancakes"}
          />
          {/* Dropdown menu */}
          <ul className="drop ml-1 px-3 list-none z-20">
              <div className="relative">
              <HomeLink />
              {isLoggedIn ? (
                <>
                  <li id="upload-drop" className="text-white text-center block p-0 w-full align-middle rounded-lg mt-3 color-yellow-600 hover:opacity-50">
                    <a href="/Upload">Upload</a>
                  </li>
                  <li id="profile-drop" className="text-white  block p-0 w-full align-middle text-center rounded-lg mt-3 hover:opacity-50">
                    <a href="/myprofile">Profile</a>
                  </li>
                  <li id="account-drop" className="text-white  block p-0 w-full align-middle text-center rounded-lg mt-3 hover:opacity-50">
                    <a href="/account">Account</a>
                  </li>
                  <li id="logout-drop" className="text-white text-center block p-0 w-full align-middle rounded-lg mt-3 hover:opacity-50">
                    <button onClick={() => handleLogoutClick(navigate)} >Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-white text-center block p-0 w-full align-middle rounded-lg mt-3 hover:opacity-50">
                    <button onClick={handleOpenModal}>Login</button>
                  </li>
                </>
              )}
            </div>
          </ul>
        </li>
      </ul>
    </div>
  );
};
