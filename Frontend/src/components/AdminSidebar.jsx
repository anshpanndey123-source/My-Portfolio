import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaFolderOpen,
  FaEnvelope,
  FaPlus,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";

export default function AdminSidebar({ onLogout }) {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-200
     ${
       isActive
         ? "bg-purple-500/20 text-purple-300 shadow-[0_0_20px_#7c3aed55]"
         : "text-gray-400 hover:bg-white/5 hover:text-white"
     }`;

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[260px] 
      bg-[#070716] border-r border-white/10 backdrop-blur-xl z-50 flex flex-col"
    >
      {/* ===== LOGO ===== */}
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-2xl font-extrabold tracking-wide">
          Ansh<span className="text-purple-400">.Admin</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Portfolio Control Panel
        </p>
      </div>

      {/* ===== NAV LINKS ===== */}
      <nav className="mt-6 flex flex-col gap-2 px-3 flex-1">

        <NavLink to="#analytics" className={linkClass}>
          <FaChartBar /> Dashboard
        </NavLink>

        {/* page scroll links (same dashboard sections) */}
        <a
          href="#add-project"
          className="flex items-center gap-3 px-6 py-3 rounded-xl 
          text-gray-400 hover:bg-white/5 hover:text-white transition"
        >
          <FaPlus /> Add Project
        </a>

        <a
          href="#projects"
          className="flex items-center gap-3 px-6 py-3 rounded-xl 
          text-gray-400 hover:bg-white/5 hover:text-white transition"
        >
          <FaFolderOpen /> Projects
        </a>

        <a
          href="#messages"
          className="flex items-center gap-3 px-6 py-3 rounded-xl 
          text-gray-400 hover:bg-white/5 hover:text-white transition"
        >
          <FaEnvelope /> Messages
        </a>

        <NavLink to="/change-password" className={linkClass}>
          <FaUserShield /> Settings
        </NavLink>
      </nav>

      {/* ===== FOOTER ===== */}
      <div className="px-6 pb-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
          bg-red-500/20 border border-red-400/30 text-red-300 
          hover:bg-red-500/30 hover:scale-[1.02] transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
}
