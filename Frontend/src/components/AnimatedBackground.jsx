import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">

      {/* 🌌 Gradient nebula */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed55,transparent_60%)]" />

      {/* ✨ Floating glowing orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.3,
            scale: Math.random() * 1.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          }}
          className="absolute w-60 h-60 md:w-72 md:h-72 rounded-full blur-3xl 
                     bg-gradient-to-r from-purple-600/40 to-cyan-400/30"
        />
      ))}

      {/* 🌠 Moving stars */}
      <div className="absolute inset-0 bg-[url('/public/Images/Stars_Portfolio_Image.png')] opacity-30 animate-stars" />
    </div>
  );
}
