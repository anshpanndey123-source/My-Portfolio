import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "portfolio",
    });

    isConnected = true;
    console.log("✅ MongoDB connected");

  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
  }
};

export default connectDB;
