import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // carica le variabili dal file .env

// Configurazione Cloudinary con chiavi dal .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
