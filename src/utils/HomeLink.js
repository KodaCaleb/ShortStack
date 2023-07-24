import { Link, useLocation } from "react-router-dom";

const HomeLink = () => {
    const location = useLocation();

    // Check if the current location is the home page
    const isHomePage = location.pathname === '/';

    // Conditional rendering: Show home link only if not on the home page
    return (
        <div>
        {!isHomePage && <Link to="/">Home</Link>}
        </div>
    );

};

export default HomeLink;