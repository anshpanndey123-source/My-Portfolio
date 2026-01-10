import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative mt-40 text-white overflow-hidden">

      {/* top glow line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      {/* background glow (same) */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-16">

        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            animate={{ textShadow: ["0 0 8px #7c3aed66", "0 0 20px #7c3aedaa", "0 0 8px #7c3aed66"] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-4xl md:text-5xl font-extrabold tracking-wide"
          >
            Ansh<span className="text-purple-400">.dev</span>
          </motion.h2>

          {/* accent micro line */}
          <motion.div
            animate={{ width: ["20%", "60%", "20%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="h-[2px] mt-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 opacity-70"
          />

          <p className="mt-5 text-gray-400 leading-relaxed max-w-sm">
            I build premium digital products, modern web experiences and scalable systems 
            focused on performance, design and business growth.
          </p>

          <div className="flex gap-4 mt-7">
            {[
              { icon: <FaGithub />, link: "https://github.com/anshpanndey123-source" },
              { icon: <FaLinkedin />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaEnvelope />, link: "mailto:anshpans483@gmail.com" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.3, y: -8 }}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 
                flex items-center justify-center backdrop-blur-md 
                hover:text-purple-400 hover:border-purple-400/50 transition"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* QUICK LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold text-lg mb-5">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            {[
              { name: "Home", link: "#home" },
              { name: "About", link: "#about" },
              { name: "Projects", link: "#projects" },
              { name: "Contact", link: "#contact" },
            ].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 10 }}
                className="group flex items-center gap-2"
              >
                <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition">›</span>
                <a href={item.link} className="hover:text-purple-400 transition">
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CONTACT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold text-lg mb-5">Contact</h3>
          <ul className="space-y-3 text-gray-400">
            {["📍 vijay nagar, Indore", "📧 anshpans483@gmail.com", "📞 +91 7489877025"].map((item, i) => (
              <li
                key={i}
                className="hover:text-purple-400 hover:translate-x-1 transition"
              >
                {item}
              </li>
            ))}
            <li className="text-sm mt-4 text-gray-500">
              Available for freelance & full-time opportunities.
            </li>
          </ul>
        </motion.div>
      </div>

    {/* ===== SIGNATURE COPYRIGHT STRIP ===== */}
    <div className="relative z-10 mt-16 border-t border-white/10 overflow-hidden">

    {/* moving gradient glow */}
    <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-1/2 h-full 
        bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
    />

    {/* scrolling text layer */}
    <motion.div
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="whitespace-nowrap flex gap-16 py-6 text-sm text-gray-400"
    >
        {Array(6).fill(0).map((_, i) => (
        <span key={i} className="flex items-center gap-3">
            <span className="text-purple-400">✦</span>
            Crafted with vision & precision by 
            <span className="text-white font-semibold"> Ansh Pandey</span>
            <span className="opacity-60">— building digital experiences, not just websites</span>
            <span className="text-purple-400">✦</span>
        </span>
        ))}
    </motion.div>

    {/* static center line */}
    <div className="relative max-w-7xl mx-auto px-6 pb-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} — Ansh Pandey · Creative Developer · India
    </div>
    </div>

    </footer>
  );
}
