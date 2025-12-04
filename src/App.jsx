import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Services from "./Services.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CitizenDashboard from "./components/Dashboard/CitizenDashboard.jsx";
import LawyerDashboard from "./components/Dashboard/LawyerDashboard.jsx";
import NGODashboard from "./components/Dashboard/NGODashboard.jsx";
import AdminDashboard from "./components/Dashboard/AdminDashboard.jsx";
import { getProfile } from "./api/auth.js";
export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchProfile();
  }, []);

  const onLogin = (userData) => {
    setUser(userData);

    if (userData.role === "CITIZEN") navigate("/dashboard/citizen");
    else if (userData.role === "LAWYER") navigate("/dashboard/lawyer");
    else if (userData.role === "NGO") navigate("/dashboard/ngo");
    else if (userData.role === "ADMIN") navigate("/dashboard/admin");
    else navigate("/");
  };

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/register" element={<Register onRegister={onLogin} />} />
        {/* ⭐ Newly added pages */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/citizen" element={<CitizenDashboard />} />
          <Route path="/dashboard/lawyer" element={<LawyerDashboard />} />
          <Route path="/dashboard/ngo" element={<NGODashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
