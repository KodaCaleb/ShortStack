import { Outlet } from "react-router-dom"
import Navbar from "../components/Header/navBar"


export default function Layout() {
    return (
        <>
        <div className="bg h-full w-full flex flex-col">
            <Navbar />
            <Outlet />
        </div>
        </>
    )
}