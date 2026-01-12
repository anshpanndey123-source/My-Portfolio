import Project from "../models/Project.js";

/* ➕ ADD PROJECT */
export const addProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      image: req.file.path,   // 👈 cloudinary url
      tech: req.body.tech?.split(",") || [],
      liveLink: req.body.liveLink,
      githubLink: req.body.githubLink,
    });

    res.json({ msg: "Project added", project });
  } catch (err) {
    res.status(500).json({ msg: "Project upload failed" });
  }
};

/* 📥 GET ALL PROJECTS (PUBLIC) */
export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

/* ❌ DELETE PROJECT */
export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ msg: "Project deleted" });
};
