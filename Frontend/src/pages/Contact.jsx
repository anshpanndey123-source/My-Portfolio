import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // frontend validation
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", msg: "Please fill all required fields." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const res = await axios.post("http://localhost:5000/api/contact", form);

      setStatus({ type: "success", msg: res.data.msg || "Message sent successfully 🚀" });
      setForm({ name: "", email: "", subject: "", message: "" });

    } catch (error) {
      setStatus({
        type: "error",
        msg: error.response?.data?.msg || "❌ Failed to send message. Try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-28 text-white overflow-hidden">

      {/* 🌌 BACKGROUND GLOWS */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full animate-pulse" />

      {/* ================= INTRO ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center px-6 mb-24"
      >
        <span className="inline-block px-4 py-1 mb-4 rounded-full 
          bg-purple-500/10 border border-purple-400/30 text-purple-300 text-sm">
          📬 Contact
        </span>

        <h2 className="text-4xl md:text-6xl font-extrabold">
          Let’s Build Something
          <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Powerful Together
          </span>
        </h2>

        <p className="mt-5 text-gray-400 leading-relaxed">
          Have a project idea, startup vision or business requirement?  
          Let’s turn it into a real digital product.
        </p>
      </motion.div>

      {/* ================= MAIN GRID ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* ================= LEFT INFO ================= */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Ready to bring your
            <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              idea to life?
            </span>
          </h3>

          <p className="mt-6 text-gray-400 max-w-xl leading-relaxed">
            I specialize in building real-world web products — from premium UI to scalable backend systems.
            If you’re serious about quality, performance and long-term growth, we’ll work great together.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-xl">
            {[
              { icon: <FaEnvelope />, title: "Email", value: "anshpans483@gmail.com" },
              { icon: <FaPhoneAlt />, title: "Phone", value: "+91 7489877025" },
              { icon: <FaMapMarkerAlt />, title: "Location", value: "Vijay Nagar, Indore" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.05 }}
                className="relative group p-5 rounded-2xl 
                backdrop-blur-xl bg-white/5 border border-white/10
                shadow-[0_0_30px_#7c3aed44]"
              >
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 
                    flex items-center justify-center text-black shadow-[0_0_20px_#7c3aed]">
                    {item.icon}
                  </div>

                  <div>
                    <div className="text-sm text-gray-400">{item.title}</div>
                    <div className="font-semibold">{item.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= RIGHT FORM ================= */}
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{ y: [0, -14, 0] }}
          whileHover={{ y: 0 }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[3rem] 
            bg-gradient-to-r from-purple-500/30 to-cyan-400/20 blur-3xl" />

          <form
            onSubmit={handleSubmit}
            className="relative rounded-[3rem] p-10
            backdrop-blur-xl bg-white/5 border border-white/10
            shadow-[0_0_80px_#7c3aed66] space-y-6"
          >

            <h4 className="text-2xl font-bold">Send a message 🚀</h4>

            <div className="grid sm:grid-cols-2 gap-5">
              <input name="name" value={form.name} onChange={handleChange}
                type="text" placeholder="Your Name" required
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-purple-400" />

              <input name="email" value={form.email} onChange={handleChange}
                type="email" placeholder="Email Address" required
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-purple-400" />
            </div>

            <input name="subject" value={form.subject} onChange={handleChange}
              type="text" placeholder="Project Type / Subject"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-purple-400" />

            <textarea name="message" value={form.message} onChange={handleChange}
              rows="5" placeholder="Tell me about your project..." required
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-purple-400 resize-none" />

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.08 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3
              bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_30px_#7c3aed]
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? "Sending..." : "Send Message"} <FaPaperPlane />
            </motion.button>

            {status.msg && (
              <p
                className={`text-sm text-center mt-2 ${
                  status.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status.msg}
              </p>
            )}
          </form>
        </motion.div>

      </div>
    </section>
  );
}
