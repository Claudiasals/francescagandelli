import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import {
  getCategoriesController,
  createCategoryController,
  reorderCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategoriesController);
router.post("/create", authMiddleware, uploadMiddleware.single("image"), createCategoryController);
router.put("/reorder", authMiddleware, reorderCategoriesController);
router.put("/:id", authMiddleware, uploadMiddleware.single("image"), updateCategoryController);
router.delete("/:id", authMiddleware, deleteCategoryController);

export default router;
