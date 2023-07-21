import { Outlet } from "react-router-dom"
<<<<<<< HEAD:src/pages/layout.js
import Navbar from "../components/header/navBar"

=======
import NavBar from "../components/header/NavBar"
>>>>>>> cfe45b259f37d1899d9e1c405cc8959489066637:src/pages/Layout.js

export default function Layout() {
    return (
        <>
        <div className="bg h-full w-full flex flex-col">
            <NavBar />
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
        </>
    )
}