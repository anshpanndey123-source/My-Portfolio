import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaInstagram, FaTwitter, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contacts", id: "contact" },
  ];

  const scrollToSection = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
        hidden md:flex items-center gap-10
        backdrop-blur-xl bg-white/5 border border-white/10 
        rounded-full px-10 py-3 shadow-[0_0_40px_#7c3aed55]"
      >
        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-bold text-purple-400 cursor-pointer 
          drop-shadow-[0_0_10px_#a855f7]"
        >
          Ansh.dev
        </motion.h1>

        {/* Links */}
        <div className="flex gap-8 text-gray-300">
          {links.map((link, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(link.id)}
              className="relative group hover:text-purple-400 transition"
            >
              {link.name}

              <span
                className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 
                group-hover:scale-x-100 transition origin-left 
                bg-gradient-to-r from-purple-400 to-cyan-400"
              />
            </button>
          ))}
        </div>

        {/* Socials */}
        <div className="flex gap-4 text-lg text-gray-300">
          {[FaInstagram, FaGithub, FaTwitter].map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.3 }}
              className="cursor-pointer hover:text-purple-400 drop-shadow-[0_0_8px_#a855f7]"
            >
              <Icon />
            </motion.div>
          ))}
        </div>
      </motion.nav>

      {/* ================= MOBILE NAVBAR ================= */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-4 left-4 right-4 z-50 flex md:hidden 
        items-center justify-between
        backdrop-blur-xl bg-white/5 border border-white/10 
        rounded-2xl px-4 py-3 shadow-[0_0_30px_#7c3aed55]"
      >
        <h1
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg font-bold text-purple-400 cursor-pointer"
        >
          Ansh.dev
        </h1>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(true)}
          className="text-xl text-gray-300"
        >
          <FaBars />
        </motion.button>
      </motion.div>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm
              bg-black/90 border-l border-white/10 p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <h1 className="text-xl font-bold text-purple-400">Ansh.dev</h1>
                <button onClick={() => setOpen(false)} className="text-xl text-gray-300">
                  <FaTimes />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-lg">
                {links.map((link, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-gray-300 hover:text-purple-400 transition"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              <div className="mt-auto flex gap-6 text-2xl text-gray-300">
                {[FaInstagram, FaGithub, FaTwitter].map((Icon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.3 }}
                    className="cursor-pointer hover:text-purple-400"
                  >
                    <Icon />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
