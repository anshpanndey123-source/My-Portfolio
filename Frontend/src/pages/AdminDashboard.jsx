import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaTrash, FaSignOutAlt, FaKey, FaPlus,
  FaChartBar, FaFolderOpen, FaEnvelope,
  FaBars, FaTimes, FaUser
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  /* 🔥 ABOUT MANAGER */
  const [aboutImage, setAboutImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [aboutData, setAboutData] = useState(null);

  const [form, setForm] = useState({
    title: "", category: "", description: "", tech: "", liveLink: "", githubLink: "",
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!token) navigate("/admin-login");
    else {
      fetchMessages();
      fetchAnalytics();
      fetchProjects();
      fetchAbout();
    }
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  /* ---------------- FETCH ---------------- */

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BASE}/admin/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch {
      localStorage.removeItem("adminToken");
      navigate("/admin-login");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${BASE}/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch {}
  };

  const fetchProjects = async () => {
    const res = await axios.get(`${BASE}/projects`);
    setProjects(res.data);
  };

  const fetchAbout = async () => {
    const res = await axios.get(`${BASE}/about`);
    setAboutData(res.data);
  };

  /* ---------------- ABOUT UPLOAD ---------------- */

  const uploadAboutImage = async (e) => {
    e.preventDefault();
    if (!aboutImage) return alert("Select image");

    const data = new FormData();
    data.append("image", aboutImage);

    await axios.post(`${BASE}/admin/about/image`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setAboutImage(null);
    fetchAbout();
    alert("✅ About image updated");
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!resume) return alert("Select resume");

    const data = new FormData();
    data.append("resume", resume);

    await axios.post(`${BASE}/admin/about/resume`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setResume(null);
    fetchAbout();
    alert("✅ Resume updated");
  };

  /* ---------------- PROJECTS ---------------- */

  const addProject = async (e) => {
    e.preventDefault();
    if (!image) return alert("Select image");

    try {
      setUploading(true);
      const data = new FormData();
      Object.keys(form).forEach((k) => data.append(k, form[k]));
      data.append("image", image);

      await axios.post(`${BASE}/admin/projects`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({ title:"", category:"", description:"", tech:"", liveLink:"", githubLink:"" });
      setImage(null);
      fetchProjects();
      alert("✅ Project added");
    } catch {
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await axios.delete(`${BASE}/admin/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(projects.filter((p) => p._id !== id));
  };

  const deleteMsg = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await axios.delete(`${BASE}/admin/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(messages.filter((m) => m._id !== id));
    fetchAnalytics();
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  if (loading)
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050510] via-[#0a0a20] to-black text-white">

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-widest">
            ANSH<span className="text-purple-400">.ADMIN</span>
          </h1>

          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-6 text-sm text-gray-300">
              <button onClick={() => scrollTo("analytics")}>Analytics</button>
              <button onClick={() => scrollTo("about-manager")}>About</button>
              <button onClick={() => scrollTo("add-project")}>Add Project</button>
              <button onClick={() => scrollTo("projects")}>Projects</button>
              <button onClick={() => scrollTo("messages")}>Messages</button>
            </div>

            <div className="flex gap-3">
              <button onClick={() => navigate("/change-password")}
                className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center gap-2">
                <FaKey /> Security
              </button>
              <button onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-400/30 flex items-center gap-2 text-red-300">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-2xl"><FaBars /></button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-bold">ADMIN MENU</h2>
            <button onClick={() => setMenuOpen(false)} className="text-2xl"><FaTimes /></button>
          </div>

          <div className="flex flex-col gap-6 text-lg">
            <button onClick={() => scrollTo("analytics")}>📊 Analytics</button>
            <button onClick={() => scrollTo("about-manager")}>👤 About</button>
            <button onClick={() => scrollTo("add-project")}>➕ Add Project</button>
            <button onClick={() => scrollTo("projects")}>📁 Projects</button>
            <button onClick={() => scrollTo("messages")}>✉ Messages</button>
            <button onClick={() => navigate("/change-password")}>🔐 Security</button>
            <button onClick={logout} className="text-red-400">🚪 Logout</button>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 space-y-28">

        {/* ANALYTICS */}
        {stats && (
          <section id="analytics">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
              <FaChartBar className="text-purple-400" /> Analytics
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                ["Total Messages", stats.total],
                ["Today", stats.today],
                ["Last 7 Days", stats.last7Days],
                ["Last 30 Days", stats.last30Days],
              ].map((s, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
                  <p className="text-gray-400 text-sm">{s[0]}</p>
                  <h2 className="text-4xl font-extrabold mt-2 text-purple-300">{s[1]}</h2>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ABOUT MANAGER */}
        <section id="about-manager">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <FaUser className="text-cyan-400" /> About Section Manager
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <form onSubmit={uploadAboutImage}
              className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="mb-4 font-semibold">Update About Image</h3>
              {aboutData?.image && (
                <img src={aboutData.image} className="w-full h-52 object-cover rounded-xl mb-4" />
              )}
              <input type="file" accept="image/*" onChange={(e) => setAboutImage(e.target.files[0])} />
              <button className="mt-4 px-6 py-2 rounded-lg bg-purple-600">Upload Image</button>
            </form>

            <form onSubmit={uploadResume}
              className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="mb-4 font-semibold">Update Resume (PDF)</h3>
              {aboutData?.resume && (
                <a href={aboutData.resume} target="_blank" className="block mb-4 text-purple-400 underline">
                  View current resume
                </a>
              )}
              <input type="file" accept="application/pdf" onChange={(e) => setResume(e.target.files[0])} />
              <button className="mt-4 px-6 py-2 rounded-lg bg-cyan-600">Upload Resume</button>
            </form>

          </div>
        </section>

        {/* ADD PROJECT */}
        <section id="add-project">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <FaPlus className="text-purple-400" /> Add New Project
          </h2>

          <form onSubmit={addProject}
            className="grid md:grid-cols-2 gap-5 p-8 rounded-3xl bg-white/5 border border-white/10">

            {["title","category","tech","liveLink","githubLink"].map((f) => (
              <input key={f} placeholder={f.toUpperCase()}
                value={form[f]}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                className="p-3 rounded-xl bg-black/40 border border-white/10" />
            ))}

            <textarea placeholder="DESCRIPTION"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="p-3 rounded-xl bg-black/40 border border-white/10 md:col-span-2" />

            <input type="file" onChange={(e) => setImage(e.target.files[0])} />

            <button disabled={uploading}
              className="md:col-span-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500">
              {uploading ? "Uploading..." : "Add Project"}
            </button>
          </form>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <FaFolderOpen className="text-purple-400" /> Projects
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <motion.div key={p._id} whileHover={{ y: -6 }}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <img src={p.image} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-3">{p.description}</p>
                  <button onClick={() => deleteProject(p._id)}
                    className="mt-3 flex items-center gap-2 text-red-400">
                    <FaTrash /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MESSAGES */}
        <section id="messages">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <FaEnvelope className="text-cyan-400" /> Messages
          </h2>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {messages.map((msg) => (
              <motion.div key={msg._id} whileHover={{ scale: 1.03 }}
                className="relative p-6 rounded-3xl bg-white/5 border border-white/10">

                <button onClick={() => deleteMsg(msg._id)}
                  className="absolute top-4 right-4 text-red-400">
                  <FaTrash />
                </button>

                <h3 className="font-semibold">{msg.name}</h3>
                <p className="text-purple-400 text-sm">{msg.email}</p>
                <p className="mt-3 text-gray-300">{msg.subject}</p>
                <p className="mt-4 text-gray-400 text-sm">{msg.message}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
