/**
 * Middleware per gestire l'upload dei file (immagini) con Multer
 * Multer è una libreria che permette a Express di leggere i file inviati dai form.
 */

import multer from "multer";

// Configurazione dello storage in memoria (senza salvarlo direttamente sul server)
// Così possiamo subito inviarlo a Cloudinary senza salvare un file fisico
const storage = multer.memoryStorage();

// Configurazione del middleware multer
const uploadMiddleware = multer({
  storage, // dove salvare temporaneamente il file (qui in memoria)
  
  // Limiti sull'upload
  limits: {
    fileSize: 5 * 1024 * 1024 // massimo 5 MB
  },

  // Filtraggio dei file: accetta solo immagini
  fileFilter: (req, file, cb) => {
    // file.mimetype → tipo del file (es. image/png, image/jpeg, application/pdf)
    // startsWith("image/") → controlla che sia un'immagine
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // accetta il file
    } else {
      // rifiuta il file e invia un messaggio di errore
      cb(new Error("Formato non valido. Carica solo immagini."));
    }
  }
});

// Middleware pronto da usare in Express
// Esporta la configurazione, così possiamo usarlo nella route
export default uploadMiddleware;
