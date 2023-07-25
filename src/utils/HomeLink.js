import { Link, useLocation } from "react-router-dom";

const HomeLink = () => {
    const location = useLocation();

    // Check if the current location is the home page
    const isHomePage = location.pathname === '/';

    // Conditional rendering: Show home link only if not on the home page
    return (
        <>
            {!isHomePage && (
                <li className="text-white text-center block p-0 align-middle rounded-lg mt-3">
                    <a href="/">Home</a>
                </li>
            )}
        </>
    );
};

export default HomeLink;