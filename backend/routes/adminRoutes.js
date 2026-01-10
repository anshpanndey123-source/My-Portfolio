import express from "express";
import { loginAdmin, changePassword } from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/admin/login", loginAdmin);
router.put("/admin/change-password", protect, changePassword); // ✅ new

export default router;
