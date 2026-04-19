import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getSiteSettingsController,
  updateSiteSettingsController,
} from "../controllers/siteSettingsController.js";

const router = express.Router();

router.get("/site-settings", getSiteSettingsController);
router.put("/site-settings", authMiddleware, updateSiteSettingsController);

export default router;
