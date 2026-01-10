import express from "express";
import {
  sendContactMessage,
  getAllMessages,
  deleteMessage
} from "../controllers/contactController.js";
import { protect } from "../middleware/auth.js";
import { getAnalytics } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", sendContactMessage);

router.get("/admin/messages", protect, getAllMessages);
router.delete("/admin/messages/:id", protect, deleteMessage);
router.get("/admin/analytics", protect, getAnalytics);

export default router;
