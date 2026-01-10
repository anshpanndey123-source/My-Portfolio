import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaTrash, FaSignOutAlt, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  /* ================= PROTECT ROUTE ================= */
  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
    } else {
      fetchMessages();
      fetchAnalytics();
    }
    // eslint-disable-next-line
  }, []);

  /* ================= FETCH MESSAGES ================= */
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      localStorage.removeItem("adminToken");
      navigate("/admin-login");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH ANALYTICS ================= */
  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.log("Analytics error");
    }
  };

  /* ================= DELETE MESSAGE ================= */
  const deleteMsg = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.filter((m) => m._id !== id));
      fetchAnalytics(); // refresh stats
    } catch {
      alert("Unauthorized or server error");
    }
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] text-white p-10">

      {/* ===== TOP BAR ===== */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">📊 Admin Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/change-password")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
            bg-purple-500/20 border border-purple-400/30 text-purple-300 
            hover:bg-purple-500/30 transition"
          >
            <FaKey /> Change Password
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
            bg-red-500/20 border border-red-400/30 text-red-300 
            hover:bg-red-500/30 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* ===== ANALYTICS ===== */}
      {stats && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">

          <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-400/30">
            <p className="text-gray-400 text-sm">Total Messages</p>
            <h2 className="text-4xl font-bold text-purple-400">{stats.total}</h2>
          </div>

          <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-400/30">
            <p className="text-gray-400 text-sm">Today</p>
            <h2 className="text-4xl font-bold text-cyan-400">{stats.today}</h2>
          </div>

          <div className="p-6 rounded-2xl bg-green-500/10 border border-green-400/30">
            <p className="text-gray-400 text-sm">Last 7 Days</p>
            <h2 className="text-4xl font-bold text-green-400">{stats.last7Days}</h2>
          </div>

          <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-400/30">
            <p className="text-gray-400 text-sm">Last 30 Days</p>
            <h2 className="text-4xl font-bold text-orange-400">{stats.last30Days}</h2>
          </div>

        </div>
      )}

      {/* ===== MESSAGES ===== */}
      <h2 className="text-2xl font-semibold mb-6">📩 Contact Messages</h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {messages.map((msg, i) => (
          <motion.div
            key={msg._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <button
              onClick={() => deleteMsg(msg._id)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-500"
            >
              <FaTrash />
            </button>

            <h2 className="text-xl font-semibold">{msg.name}</h2>
            <p className="text-purple-400 text-sm">{msg.email}</p>
            <p className="mt-2 text-gray-300">{msg.subject || "No subject"}</p>

            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              {msg.message}
            </p>

            <p className="mt-4 text-xs text-gray-500">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>

      {messages.length === 0 && (
        <p className="text-gray-400 mt-10">No messages yet.</p>
      )}
    </div>
  );
}
