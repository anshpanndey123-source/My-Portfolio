import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaRocket, FaStar } from "react-icons/fa";

const stats = [
  { icon: <FaCode />, value: "10+", label: "Projects" },
  { icon: <FaLaptopCode />, value: "1.5+", label: "Years Experience" },
  { icon: <FaRocket />, value: "10+", label: "Technologies" },
];

export default function About() {
  const [about, setAbout] = useState(null);
  const BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE}/about`).then((res) => {
      console.log("ABOUT DATA:", res.data);
      setAbout(res.data);
    });
  }, []);

  return (
    <section id="about" className="relative min-h-screen text-white overflow-hidden py-32 mt-10">
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-20 items-center">

{/* ================= IMAGE ================= */}
<motion.div
  initial={{ opacity: 0, x: -60, scale: 0.8 }}
  whileInView={{ opacity: 1, x: 0, scale: 1 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="relative flex justify-center md:justify-start"
>
  {/* 🔁 PERMANENT FLOATING WRAPPER */}
  <motion.div
    animate={{
      y: [0, -14, 10, -8, 0],
      rotate: [0, -1.5, 1.5, -1, 0],
      scale: [1, 1.02, 0.98, 1.01, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative"
  >
    {/* GLOW */}
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.35] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -inset-3 rounded-[2rem] 
      bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 blur-2xl"
    />

    {/* IMAGE CARD */}
    <div
      className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-[2rem]
      backdrop-blur-xl bg-white/5 border border-white/10 
      flex items-center justify-center overflow-hidden
      shadow-[0_0_50px_#7c3aed66]"
    >
      {about?.image && (
        <img
          src={about.image}
          alt="About"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  </motion.div>
</motion.div>


        {/* ================= CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span
            className="inline-block px-4 py-1 mb-5 rounded-full 
            bg-purple-500/10 border border-purple-400/30 
            text-purple-300 text-sm"
          >
            👋 About Me
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Building digital experiences that feel
            <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              powerful, modern & meaningful.
            </span>
          </h2>

          <p className="mt-6 text-gray-400 leading-relaxed max-w-xl">
            I’m a passionate{" "}
            <span className="text-purple-400 font-semibold">Full Stack Developer</span>{" "}
            who designs and builds ultra-modern, high-performance web applications
            with strong focus on UI, UX and scalability.
          </p>

          {/* DIFFERENT */}
          <div className="mt-10 p-5 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 max-w-xl">
            <div className="flex items-center gap-3 mb-2 text-purple-300 font-semibold">
              <FaStar /> What makes me different
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              I don’t just write code — I craft premium experiences. I deeply care
              about design, animations, performance and building products people
              love to use.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-5 mt-10 max-w-md">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 
                p-4 text-center shadow-[0_0_20px_#7c3aed55]"
              >
                <div className="text-purple-400 text-2xl mb-2 flex justify-center">
                  {s.icon}
                </div>
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-12 flex-wrap">
            {about?.resume && (
          <a
            href={`${BASE}/download-resume`}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 
            shadow-[0_0_30px_#7c3aed] hover:scale-110 transition"
          >
            Download Resume
          </a>

            )}

            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-7 py-3 rounded-xl border border-white/10 
              hover:border-purple-400 hover:text-purple-400 transition"
            >
              Contact Me
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
