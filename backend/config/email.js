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
  connectionTimeout: 10000000, // 10 sec
  greetingTimeout: 10000000,
  socketTimeout: 10000000,
});

transporter.verify((err, success) => {
  if (err) {
    console.log("❌ SMTP ERROR:", err.message);
  } else {
    console.log("✅ SMTP READY (Brevo connected)");
  }
});

transporter.get("/test-mail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: "Test <test@yourdomain.com>",
      to: "yourmail@gmail.com",
      subject: "Render SMTP Test",
      text: "Email from Render server",
    });

    res.send("✅ Email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ " + err.message);
  }
});

export default transporter;
