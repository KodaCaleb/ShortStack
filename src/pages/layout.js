import { Outlet } from "react-router-dom"
import Navbar from "../components/Header/navBar"



export default function Layout() {
    return (
        <>
        <div className="h-full w-full flex">
            <Navbar />
            <Outlet />
        </div>
        </>

    )
}