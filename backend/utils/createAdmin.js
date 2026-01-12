import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // ⚠ purane admins delete (optional but recommended)
    await Admin.deleteMany();

    const hashed = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@portfolio.com",
      password: hashed,
    });

    console.log("✅ Fresh admin created");
    process.exit();
  } catch (err) {
    console.log("❌ Admin create error:", err.message);
    process.exit(1);
  }
};

run();
