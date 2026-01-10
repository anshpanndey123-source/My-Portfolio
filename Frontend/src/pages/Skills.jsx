import { motion } from "framer-motion";
import { FaCode, FaLaptopCode } from "react-icons/fa";
import {
  SiReact, SiMongodb,
  SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiExpress, SiFirebase,
  SiGithub, SiGit, SiPostman, SiFigma
} from "react-icons/si";

/* ================= ROLES ================= */

const roles = [
  {
    title: "Frontend Developer",
    desc: "Crafting cinematic, responsive and animated user interfaces with strong UX focus.",
    icon: <FaCode />,
  },
  {
    title: "Backend Developer",
    desc: "Designing secure, scalable backend systems, APIs and authentication flows.",
    icon: <FaLaptopCode />,
  },
  {
    title: "React Developer",
    desc: "Building high-performance SPA architectures with clean component systems.",
    icon: <SiReact />,
  },
  {
    title: "MERN Stack Developer",
    desc: "Developing complete full-stack products from database to deployment.",
    icon: <SiMongodb />,
  },
];

/* ================= SKILLS ================= */

const skills = [
  { name: "React", icon: <SiReact /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "HTML5", icon: <SiHtml5 /> },
  { name: "CSS3", icon: <SiCss3 /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "Git", icon: <SiGit /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Postman", icon: <SiPostman /> },
  { name: "Figma", icon: <SiFigma /> },
];

/* ================= COMPONENT ================= */

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen py-20 text-white overflow-hidden">

      {/* ===== INTRO ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto text-center px-5 mb-28"
      >
        <span className="inline-block px-4 py-1 mb-4 rounded-full 
          bg-purple-500/10 border border-purple-400/30 
          text-purple-300 text-sm">
          ⚡ Skill Zone
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold">
          Engineering
          <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            My Power Stack
          </span>
        </h2>

        <p className="mt-4 text-gray-400">
          A creative ecosystem of technologies I use to design, build and scale modern web products.
        </p>
      </motion.div>

      {/* ===== MAIN GRID ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">

        {/* ================= LEFT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
            What I actually
            <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              build & deliver.
            </span>
          </h3>

          <p className="mt-6 text-gray-400 max-w-xl leading-relaxed">
            I don’t just use tools. I engineer full digital systems — premium UI, scalable backend and real-world performance.
          </p>

          {/* ROLE CARDS */}
          <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-xl">
            {roles.map((r, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative p-6 rounded-2xl 
                backdrop-blur-xl bg-white/5 border border-white/10
                shadow-[0_0_30px_#7c3aed44] overflow-hidden"
              >
                <div className="absolute -inset-0.5 rounded-2xl 
                  bg-gradient-to-r from-purple-500 to-cyan-400 
                  blur-xl opacity-0 group-hover:opacity-40 transition" />

                <div className="relative w-11 h-11 mb-4 rounded-xl 
                  bg-gradient-to-br from-purple-500 to-cyan-400
                  flex items-center justify-center shadow-[0_0_20px_#7c3aed]">
                  <div className="text-black text-xl">{r.icon}</div>
                </div>

                <h4 className="relative font-semibold text-lg">{r.title}</h4>
                <p className="relative text-gray-400 text-sm mt-2 leading-relaxed">
                  {r.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm text-gray-300">
            {["Premium UI", "Scalable Systems", "Modern Stack", "Performance Driven", "Clean Architecture"].map((tag, i) => (
              <span key={i} className="px-4 py-1 rounded-full bg-white/5 border border-white/10">
                ⚡ {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ================= RIGHT – RANDOM ENERGY FIELD ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative w-full h-[520px]"
        >
          {/* glows */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/30 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/30 blur-3xl rounded-full" />

          {skills.map((s, i) => {
            const top = Math.random() * 80 + 5;
            const left = Math.random() * 80 + 5;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                // transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                animate={{ y: [0, -15, 0] }}
                transition={{
                  delay: i * 0.08 ,
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ top: `${top}%`, left: `${left}%` }}
                className="absolute group"
              >
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className="w-14 h-14 rounded-2xl 
                  backdrop-blur-xl bg-white/5 border border-white/10 
                  flex items-center justify-center cursor-pointer
                  shadow-[0_0_25px_#7c3aed66]"
                >
                  <div className="text-2xl text-purple-400">{s.icon}</div>
                </motion.div>

                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 
                text-[10px] text-gray-400 tracking-wide">
                {s.name}
                </span>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
