import { Outlet } from "react-router-dom";
import NavBar from "../components/header/NavBar";
import SearchContext from "../utils/searchLogic/SearchContext";
import React, { useState } from "react";

export default function Layout() {
  const [matchingVideos, setMatchingVideos] = useState([]);

  return (
    <>
      <SearchContext.Provider value={{ matchingVideos, setMatchingVideos }}>
        <div className="flex flex-col">
          <NavBar />
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      </SearchContext.Provider>
    </>
  );
}
