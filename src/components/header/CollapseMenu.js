import PancakeLogo from "../../assets/pancakeLogo.png";
import { HandleLogout } from "../../utils/LoginLogout";
import { useContext } from "react";
import AuthContext from "../../utils/AuthContext"; // Import the AuthContext

export default function CollapseMenu() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div>
        <ul className="main p-0 relative list-none inline-block ">
          <li className="relative inline-block  mr-4 cursor-pointer z-5 w-20">
            <img
              className="h-14 w-11/12 cursor-pointer "
              src={PancakeLogo}
              alt=""
            />
            <ul className="drop top-12 list-none absolute  z-10">
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
                  {isLoggedIn ? (
                    <a onClick={HandleLogout}>Logout</a>
                  ) : (
                    <a href="/login">Login</a>
                  )}
                </li>
              </div>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
