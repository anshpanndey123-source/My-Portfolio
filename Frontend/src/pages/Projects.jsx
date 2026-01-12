import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE = import.meta.env.VITE_BASE_URL; // http://localhost:5000/api

  /* ================= FETCH PROJECTS ================= */
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE}/projects`);
      setProjects(res.data);
    } catch (err) {
      console.log("❌ Project fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading projects...
      </div>
    );
  }

  return (
    <section id="projects" className="relative py-28 text-white overflow-hidden">

      {/* ===== INTRO ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center px-6 mb-24"
      >
        <span className="inline-block px-4 py-1 mb-4 rounded-full 
          bg-purple-500/10 border border-purple-400/30 text-purple-300 text-sm">
          🚀 Featured Work
        </span>

        <h2 className="text-4xl md:text-6xl font-extrabold">
          Engineering Real
          <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Digital Products
          </span>
        </h2>

        <p className="mt-6 text-gray-400 leading-relaxed">
          Real-world production systems built with performance, scalability and design in mind.
        </p>
      </motion.div>

      {/* ===== PROJECTS ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-32">

        {projects.map((p, i) => {
          const reverse = i % 2 !== 0;

          return (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* ===== TEXT ===== */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 80 : -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className={reverse ? "lg:order-2" : ""}
                >
                  <span className="text-purple-400 text-sm font-semibold">
                    {p.category}
                  </span>

                  <h3 className="text-4xl md:text-5xl font-extrabold mt-3">
                    {p.title}
                  </h3>

                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full my-6" />

                  <p className="text-gray-400 leading-relaxed max-w-xl">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">
                    {p.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-1.5 rounded-full text-sm 
                        bg-white/5 border border-white/10 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-5 mt-10">
                    {p.liveLink && (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl 
                        bg-gradient-to-r from-purple-600 to-cyan-500 
                        shadow-[0_0_30px_#7c3aed] hover:scale-110 transition"
                      >
                        View Live <FaExternalLinkAlt />
                      </a>
                    )}

                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl 
                        border border-white/15 text-gray-300 hover:text-white hover:border-white/30 transition"
                      >
                        Code <FaGithub />
                      </a>
                    )}
                  </div>
                </motion.div>

                {/* ===== IMAGE ===== */}
                <motion.div
                  animate={{ y: [0, -18, 0] }}
                  transition={{
                    duration: 8 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`${reverse ? "lg:order-1" : ""} relative`}
                >
                  {/* ambient glow */}
                  <div className="absolute -top-16 -left-16 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full" />
                  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-cyan-400/20 blur-3xl rounded-full" />

                  <motion.div
                    whileHover={{ scale: 1.05, rotate: reverse ? -1.5 : 1.5 }}
                    className="relative rounded-[3rem] overflow-hidden
                    backdrop-blur-xl bg-white/5 border border-white/10
                    shadow-[0_0_100px_#7c3aed66]"
                  >
                    <img
                      src={p.image}   // ✅ Cloudinary URL from DB
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {projects.length === 0 && (
        <p className="text-center text-gray-400 mt-24">
          No projects added yet.
        </p>
      )}
    </section>
  );
}
