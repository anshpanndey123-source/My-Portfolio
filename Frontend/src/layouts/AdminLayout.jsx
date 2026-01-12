import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-screen bg-[#050510] text-white">
      <AdminSidebar onLogout={logout} />

      {/* MAIN CONTENT */}
      <div className="ml-[260px] flex-1 px-10 py-10">
        <Outlet />
      </div>
    </div>
  );
}
