import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage";
import FrequentlyAskedQuestions from "./pages/frequentlyaskedquestions";
import Profile from "./pages/profile";
import Servkces from "./pages/services";
import Login from "./pages/login";
import Register from "./pages/regiister";

import Sidebar from "./components/sidebar/sidebar";
import Navbar from "components/navbar/navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar id="navbar" />
        <Navbar id="navbar-clone" />
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FrequentlyAskedQuestions />} />
          <Route path="/services" element={<Servkces />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
