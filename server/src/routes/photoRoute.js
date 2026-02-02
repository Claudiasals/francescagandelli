import express from "express";
import { getPhotosByCategory, uploadPhoto } from "../controllers/photoController.js";

const router = express.Router();

// GET foto per categoria
router.get("/:category", getPhotosByCategory);

// POST upload foto per categoria
router.post("/:category", uploadPhoto);

export default router; // <-- export default per l'import in server.js
