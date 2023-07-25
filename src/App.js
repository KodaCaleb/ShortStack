import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import FavoritesProfile from "./pages/FavoritesProfile"
import EditAccount from "./pages/EditAccount";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:displayName" element={<FavoritesProfile />} />
          <Route path="/account" element={<EditAccount />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>  
    </BrowserRouter>

  )
}
export default App;