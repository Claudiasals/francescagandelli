import cloudinary from "../config/cloudinary.js";
import Cover from "../models/coverModel.js";

export const updateCoverController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Nessun file caricato" });

    // upload_stream per file in memoria
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio_cover",
        public_id: "cover",
        overwrite: true,
      },
      async (error, result) => {
        if (error) return res.status(500).json({ message: "Errore caricamento Cloudinary", error });

        // salva nel DB
        let cover = await Cover.findOne();
        if (!cover) {
          cover = new Cover({ imageUrl: result.secure_url });
          await cover.save();
        } else {
          cover.imageUrl = result.secure_url;
          await cover.save();
        }

        res.status(200).json({ message: "Copertina aggiornata!", coverUrl: result.secure_url });
      }
    );

    stream.end(req.file.buffer); // invia il buffer a Cloudinary

  } catch (error) {
    console.error("Errore aggiornamento copertina:", error);
    res.status(500).json({ message: "Errore server" });
  }
};


/* 
req.file → il file ricevuto dal middleware uploadMiddleware
cloudinary.uploader.upload → carica il file su Cloudinary
folder → organizza le immagini in cartelle Cloudinary
public_id → sovrascrive sempre la stessa immagine di copertina
Cover.findOne() → prende il documento esistente nel DB
cover.imageUrl = result.secure_url → aggiorna l’URL nel DB
res.json() → manda la nuova URL al frontend per aggiornare subito la pagina
*/

export const getCoverController = async (req, res) => {
  try {
    const cover = await Cover.findOne();
    if (!cover) {
      return res.status(404).json({ message: "Copertina non trovata" });
    }
    res.status(200).json({ coverUrl: cover.imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore server" });
  }
};
