import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, (req, res) => {
  // logica per creare categoria
});

export default router;
