import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard"; // ✅ admin panel
import AdminLogin from "./pages/AdminLogin";
import ChangePassword from "./pages/ChangePassword";

export default function App() {
  return (
    <Routes>

      {/* ===== PUBLIC WEBSITE ===== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ===== ADMIN DASHBOARD (NO MAIN LAYOUT) ===== */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/change-password" element={<ChangePassword />} />

    </Routes>
  );
}
