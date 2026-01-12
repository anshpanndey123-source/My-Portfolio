import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
// import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ChangePassword from "./pages/ChangePassword";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/change-password" element={<ChangePassword />} />
      

      {/* LOGIN (without layout) */}
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  );
}
