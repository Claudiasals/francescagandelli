import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

// POST /api/category/create → crea categoria (solo admin)
router.post("/create", authMiddleware, createCategoryController);

export default router;
