import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import About from "../pages/About.jsx";
import Skills from "../pages/Skills.jsx";
import Projects from "../pages/Projects.jsx";
import Contacts from "../pages/Contact.jsx";
// import Footer from "../components/Footer.jsx";

import { 
  SiReact, SiJavascript, SiNodedotjs, SiTypescript,
  SiMongodb, SiFirebase, SiTailwindcss, SiGithub
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import Footer from "../pages/Footer.jsx";

const techIcons = [
  { icon: SiReact, color: "text-cyan-400", name: "React" },
  { icon: SiJavascript, color: "text-yellow-400", name: "JavaScript" },
  { icon: SiNodedotjs, color: "text-green-500", name: "Node" },
  { icon: FaAws, color: "text-orange-400", name: "AWS" },
  { icon: SiTypescript, color: "text-blue-400", name: "TypeScript" },
  { icon: SiMongodb, color: "text-green-400", name: "MongoDB" },
  { icon: SiFirebase, color: "text-orange-500", name: "Firebase" },
  { icon: SiTailwindcss, color: "text-sky-400", name: "Tailwind" },
  { icon: SiGithub, color: "text-white", name: "GitHub" },
];

export default function Home() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white">

      {/* 🌌 CINEMATIC BACKGROUND */}
      <AnimatedBackground />

      {/* 🌕 NAVBAR GLOW */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 
        w-[90vw] max-w-[700px] h-[300px] rounded-b-full 
        bg-[radial-gradient(circle,#c084fc,transparent_70%)] blur-3xl opacity-60" 
      />

      {/* ================= HERO ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-28 md:pt-40 
        grid md:grid-cols-2 gap-16 items-center">

        {/* 🔥 LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-purple-500/10 border 
            border-purple-400/30 text-purple-300 text-sm">
            🚀 Fullstack Developer Portfolio
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mt-6 leading-tight">
            Providing the <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500 
              bg-clip-text text-transparent animate-pulse">
              best project
            </span>{" "}
            experience.
          </h1>

          <p className="mt-6 text-gray-400 max-w-xl leading-relaxed">
            I'm a Full Stack Developer building ultra-modern, high-performance and animated web apps.
          </p>

          <div className="flex gap-4 mt-10 flex-wrap">
            <button
             onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
             className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 
              shadow-[0_0_35px_#7c3aed] hover:scale-110 transition">
              View Projects
            </button>

            <button 
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 rounded-xl border border-white/10 
              hover:border-purple-400 hover:text-purple-400 transition">
              About Me
            </button>
          </div>
        </motion.div>

        {/* 🌀 TECH ORBIT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] 
            md:w-[460px] md:h-[460px] mx-auto flex items-center justify-center z-50"
        >

          {/* Rings */}
          <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute inset-[12%] rounded-full border border-purple-400/20" />

          {/* ROTATOR */}
          <div
            className={`absolute inset-0 ${paused ? "" : "animate-spin-slow"}`}
            style={{ transformOrigin: "50% 50%" }}
          >
            {techIcons.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotate(${i * (360 / techIcons.length)}deg) translateX(42%)`
                  }}
                >
                  <div
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    className="relative z-50 pointer-events-auto
                      w-14 h-14 sm:w-16 sm:h-16 rounded-2xl 
                      backdrop-blur-xl bg-white/5 border border-white/10 
                      flex flex-col items-center justify-center cursor-pointer
                      shadow-[0_0_20px_#7c3aed66] 
                      hover:scale-125 hover:shadow-[0_0_45px_#7c3aed] 
                      transition-all duration-300"
                  >
                    <Icon size={26} className={item.color} />
                    <span className="text-[9px] mt-1 text-gray-300">{item.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🌍 CENTER CORE */}
          <div className="pointer-events-none absolute flex items-center justify-center">
            <div className="absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full 
              bg-[radial-gradient(circle,#a855f7,transparent_70%)] 
              blur-3xl opacity-80" />

            <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full 
              border border-purple-400/40 animate-pulse" />

            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full 
              bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-400
              shadow-[0_0_60px_#a855f7] animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <About />
      <Skills />
      <Projects />
      <Contacts/>
      <Footer />
    </div>
  );
}
