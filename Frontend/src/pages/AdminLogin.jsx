import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`, form);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={submit} className="bg-white/5 p-8 rounded-xl w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input placeholder="Email" type="email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 rounded bg-black/40 border border-white/10" />
        <input placeholder="Password" type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 rounded bg-black/40 border border-white/10" />
        <button className="w-full bg-purple-600 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
