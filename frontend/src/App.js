import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Capsules from "./components/Capsules";
import Timeline from "./components/Timeline";
import Summary from "./components/Summary";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* We keep /homepage just in case, but map /home to it as well */}
        <Route path="/homepage" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/capsules" element={<Capsules />} />
        <Route path="/home/timeline" element={<Timeline />} />
        <Route path="/home/summary" element={<Summary />} />
        <Route path="/home/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;