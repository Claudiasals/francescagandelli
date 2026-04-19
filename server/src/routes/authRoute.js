import express from "express";
import { loginAdmin, getDashboard, changePasswordController } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.put("/password", authMiddleware, changePasswordController);

export default router;
