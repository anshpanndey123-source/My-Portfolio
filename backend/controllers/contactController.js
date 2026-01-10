import Contact from "../models/contact.js";
import transporter from "../config/email.js";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    /* ---------- VALIDATION ---------- */
    if (!name || !email || !message) {
      return res.status(400).json({ msg: "All required fields must be filled" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    /* ---------- SAVE TO DATABASE ---------- */
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    /* ---------- EMAIL TO YOU ---------- */
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: `📩 New Portfolio Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject || "Not provided"}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    /* ---------- AUTO REPLY TO USER ---------- */
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Thanks for contacting me 🚀",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for reaching out! I’ve received your message and will get back to you as soon as possible.</p>
        <br/>
        <p><b>Your message:</b></p>
        <p>${message}</p>
        <br/>
        <p>— Ansh Pandey</p>
        <p style="color:gray;font-size:13px">This is an automated confirmation email.</p>
      `,
    });

    res.status(201).json({ msg: "Message sent successfully ✅" });

  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};


/* ================= GET ALL MESSAGES ================= */
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch messages" });
  }
};

/* ================= DELETE MESSAGE ================= */
export const deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to delete message" });
  }
};


/* ================= DASHBOARD ANALYTICS ================= */
export const getAnalytics = async (req, res) => {
  try {
    const total = await Contact.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayCount = await Contact.countDocuments({
      createdAt: { $gte: today }
    });

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last7Count = await Contact.countDocuments({
      createdAt: { $gte: last7Days }
    });

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const last30Count = await Contact.countDocuments({
      createdAt: { $gte: last30Days }
    });

    res.json({
      total,
      today: todayCount,
      last7Days: last7Count,
      last30Days: last30Count,
    });

  } catch (err) {
    res.status(500).json({ msg: "Analytics error" });
  }
};
