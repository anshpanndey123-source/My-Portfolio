import express from "express";
import { addProject, getProjects, deleteProject } from "../controllers/projectController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* 🌍 PUBLIC */
router.get("/projects", getProjects);

/* 🔐 ADMIN */
router.post("/admin/projects", protect, upload.single("image"), addProject);
router.delete("/admin/projects/:id", protect, deleteProject);

export default router;
