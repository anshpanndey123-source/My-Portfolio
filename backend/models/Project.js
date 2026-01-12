import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // cloudinary url
  tech: [String],
  liveLink: String,
  githubLink: String,
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
