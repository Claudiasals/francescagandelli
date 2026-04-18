import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import {
  getAboutController,
  updateAboutTextController,
  addAboutImageController,
  deleteAboutImageController,
} from "../controllers/aboutController.js";

const router = express.Router();

router.get("/about", getAboutController);
router.put("/about/text", authMiddleware, updateAboutTextController);
router.post(
  "/about/image",
  authMiddleware,
  uploadMiddleware.single("photo"),
  addAboutImageController
);
router.delete("/about/image/:index", authMiddleware, deleteAboutImageController);

export default router;
