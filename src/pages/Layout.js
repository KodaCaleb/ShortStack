import { Outlet } from "react-router-dom"
import NavBar from "../components/header/NavBar"

export default function Layout() {
    return (
        <>
        <div className="flex flex-col">
            <NavBar />
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
        </>
    )
}