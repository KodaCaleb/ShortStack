import { Outlet } from "react-router-dom"
import Navbar from "../components/Header/NavBar"


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