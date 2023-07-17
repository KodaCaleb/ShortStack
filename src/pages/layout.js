import { Outlet } from "react-router-dom"
import Navbar from "../components/Header/navBar"
import Video from "../components/VideoContainer/video"


export default function Layout() {
    return (
        <>
        <div className="h-full w-full flex flex-col">
            <Navbar />
            <Outlet />
        </div>
        </>
    )
}