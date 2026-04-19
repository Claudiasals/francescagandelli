import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getContactPageController,
  updateContactPageTextController,
} from "../controllers/contactPageController.js";

const router = express.Router();

router.get("/contact-page", getContactPageController);
router.put("/contact-page/text", authMiddleware, updateContactPageTextController);

export default router;
