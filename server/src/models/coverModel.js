import mongoose from "mongoose";

// Schema per la copertina nella collection "cover"
const coverSchema = new mongoose.Schema(
  {
    // URL dell'immagine della copertina
    imageUrl: { type: String, required: true },
  },
  { timestamps: true } // salva createdAt e updatedAt automaticamente
);

// Esporta il modello Cover, con collection "cover"
export default mongoose.model("Cover", coverSchema, "cover");

/* Note:
imageUrl → deve essere una stringa perché conterrà l’URL di Cloudinary.
timestamps: true → utile per sapere quando è stata aggiornata l’ultima volta.
*/

