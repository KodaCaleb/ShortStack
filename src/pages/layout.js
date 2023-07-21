import { Outlet } from "react-router-dom";
import Navbar from "../components/header/NavBar";

export default function Layout() {
  return (
    <>
      <div className="bg h-screen w-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </>
  );
}
