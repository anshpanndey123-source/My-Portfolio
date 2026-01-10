import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/change-password`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setMsg("✅ Password changed. Please login again.");
      localStorage.removeItem("adminToken");

      setTimeout(() => navigate("/admin-login"), 1500);

    } catch (err) {
      setMsg(err.response?.data?.msg || "❌ Failed to change password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={submit}
        className="bg-white/5 border border-white/10 backdrop-blur-xl 
        p-8 rounded-2xl w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">🔐 Change Password</h2>

        {msg && <p className="text-sm text-center text-purple-400">{msg}</p>}

        <input
          type="password"
          placeholder="Old Password"
          required
          onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
          className="w-full p-3 rounded bg-black/40 border border-white/10 outline-none"
        />

        <input
          type="password"
          placeholder="New Password"
          required
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          className="w-full p-3 rounded bg-black/40 border border-white/10 outline-none"
        />

        <button className="w-full bg-purple-600 py-3 rounded-lg font-semibold">
          Update Password
        </button>
      </form>
    </div>
  );
}
