import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio-projects",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/about",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const fileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/resume",
    resource_type: "raw",
    allowed_formats: ["pdf"],
  },
});

const upload = multer({ storage });
export const uploadAboutImage = multer({ storage: imageStorage });
export const uploadResume = multer({ storage: fileStorage });


export default upload;
