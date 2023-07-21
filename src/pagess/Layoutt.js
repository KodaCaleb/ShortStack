import { Outlet } from "react-router-dom"
import Navbar from "../componentss/header/NavBar"

export default function Layout() {
    return (
        <>
        <div className="bg h-full w-full flex flex-col">
            <Navbar />
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
        </>
    )
}