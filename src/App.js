import "./App.css";
import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
import Profile from "./pages/Profile";
import UserAccount from "./pages/UserAccount";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<UserAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>  
    </BrowserRouter>


  )
}
export default App;