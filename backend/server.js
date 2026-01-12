import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import transporter from "./config/email.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api", adminRoutes);
app.use("/api", projectRoutes);
app.use("/api", aboutRoutes);


/* ================= BASIC TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("🚀 Portfolio backend running...");
});

/* ================= CONTACT ROUTES ================= */
app.use("/api", contactRoutes);

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err.message));

/* ================= SMTP TEST (run once) ================= */
setTimeout(async () => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: "Brevo SMTP Connected 🚀",
      text: "Congratulations! Your Brevo SMTP is successfully connected with your portfolio backend."
    });

    console.log("✅ Test email sent successfully");
  } catch (err) {
    console.log("❌ Test email error:", err.message);
  }
}, 3000);

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
