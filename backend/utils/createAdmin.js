import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const hashed = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@portfolio.com",
    password: hashed,
  });

  console.log("✅ Admin created");
  process.exit();
};

createAdmin();
