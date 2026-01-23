import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { updateCoverController } from "../controllers/coverController.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

import { getCoverController } from "../controllers/coverController.js";
const router = express.Router();

// PUT /api/cover per aggiorna l'immagine di copertina
router.put(
    "/cover",
    authMiddleware, // controlla token admin
    uploadMiddleware.single("cover"),  // legge il file dal form con nome "cover"
    updateCoverController // carica su Cloudinary e salva nel DB
  );

  // GET /api/cover → ritorna l'immagine di copertina dal DB
router.get("/cover", getCoverController);



  export default router;
