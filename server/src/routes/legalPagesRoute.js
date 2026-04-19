import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getLegalPagesController,
  updateLegalPagesTextController,
} from "../controllers/legalPagesController.js";

const router = express.Router();

router.get("/legal-pages", getLegalPagesController);
router.put("/legal-pages/text", authMiddleware, updateLegalPagesTextController);

export default router;
