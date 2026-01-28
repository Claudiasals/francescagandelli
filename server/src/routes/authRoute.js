import express from "express";
import { loginAdmin, getDashboard } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route login
router.post("/login", loginAdmin);


export default router;
