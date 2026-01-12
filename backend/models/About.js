import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  image: String,
  resume: String,
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("About", aboutSchema);
