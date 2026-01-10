import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // 587
  auth: {
    user: process.env.EMAIL_USER,   // 9facea001@smtp-brevo.com
    pass: process.env.EMAIL_PASS,   // SMTP key
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log("❌ SMTP ERROR:", err.message);
  } else {
    console.log("✅ SMTP READY (Brevo connected)");
  }
});

export default transporter;
