import express from "express";
import axios from "axios";
import { getAbout, updateAboutImage, updateResume } from "../controllers/aboutController.js";
import { uploadAboutImage, uploadResume } from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";
import About from "../models/About.js";

const router = express.Router();

/* ================= PUBLIC ================= */

router.get("/about", getAbout);

/* 🔥 FORCE RESUME DOWNLOAD */
router.get("/download-resume", async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about || !about.resume) {
      return res.status(404).send("Resume not found");
    }

    const cloudinaryUrl = about.resume;
    console.log("CLOUDINARY RESUME:", cloudinaryUrl);

    const response = await axios.get(cloudinaryUrl, {
      responseType: "stream",
    });

    res.setHeader("Content-Disposition", "attachment; filename=Ansh_Resume.pdf");
    res.setHeader("Content-Type", "application/pdf");

    response.data.pipe(res);

  } catch (err) {
    console.log("RESUME DOWNLOAD ERROR:", err.message);
    res.status(500).send("Resume download failed");
  }
});

/* ================= ADMIN ================= */

router.post("/admin/about/image", protect, uploadAboutImage.single("image"), updateAboutImage);

router.post("/admin/about/resume", protect, uploadResume.single("resume"), updateResume);

export default router;
