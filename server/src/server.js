// Express il framework per creare il server HTTP
import express from "express";
// dotenv per leggere le variabili d'ambiente dal file .env
import dotenv from "dotenv";
// funzione per connetterci a MongoDB (db.js)
import connectDB from "./config/db.js";
// importo le rotte per l'autenticazione
import authRoutes from "./routes/authRoute.js";
// importo CORS per permettere richieste cross-origin
import cors from "cors";
// rotta per copertina portfolio
import coverRoutes from "./routes/coverRoute.js";
import aboutRoutes from "./routes/aboutRoute.js";
import contactPageRoutes from "./routes/contactPageRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import galleryRoutes from "./routes/galleryRoute.js";
import siteSettingsRoutes from "./routes/siteSettingsRoute.js";
import legalPagesRoutes from "./routes/legalPagesRoute.js";
import SiteSettings from "./models/siteSettingsModel.js";
import { DEFAULT_PUBLIC_EMAIL } from "./controllers/siteSettingsController.js";
// libreria email x form  
import nodemailer from "nodemailer";  


// Carico le variabili d'ambiente presenti nel file .env
dotenv.config();


// Creo l'istanza dell'app Express
const app = express();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* TEST FORM EMAIL:
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP non valido:", error);
  } else {
    console.log("✅ SMTP pronto a inviare email");
  }
}); */
 


// Configurazione CORS sicura
const allowedOrigins = [
  // Lista dei domini da cui accetti richieste:
  "http://localhost:5173",  // Vite frontend in sviluppo
  "https://tuo-dominio.com"  // produzione
];

// Middleware CORS per Express
// Configuro CORS per permettere richieste solo dai domini specificati
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `La richiesta da ${origin} non è permessa!`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // permette cookie se servono in futuro
}));
/*
origin → è il dominio che sta facendo la richiesta (es. http://localhost:5173).
callback → è una funzione che chiami per dire “ok, questa origine è permessa” oppure “no, blocca”.
*/


// Middleware per leggere automaticamente il JSON presente 
// nel body delle richieste (utile per POST, PUT, PATCH)
app.use(express.json());

// Collegamento delle rotte auth
app.use("/api/auth", authRoutes);


// Rotta di test per verificare che il server funzioni
app.get("/", (req, res) => {
  res.send("Server Francesca Gandelli Portfolio OK");
});

// Rotta per copertina
app.use("/api", coverRoutes);

// Chi Sono: testo e galleria immagini (GET pubblico, PUT/POST/DELETE admin)
app.use("/api", aboutRoutes);
app.use("/api", contactPageRoutes);
app.use("/api", legalPagesRoutes);

// Categorie home (card portfolio)
app.use("/api/categories", categoryRoutes);

// Foto per categoria (gallerie /family, /portrait, /gallery/:slug, …)
app.use("/api/gallery", galleryRoutes);
app.use("/api", siteSettingsRoutes);

// Rotta per il form di contatto
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      status: "error",
      message: "Tutti i campi sono obbligatori"
    });
  }

  try {
    const settings = await SiteSettings.findOne();
    const toEmail =
      settings?.publicEmail?.trim() ||
      process.env.CONTACT_MAIL_TO?.trim() ||
      DEFAULT_PUBLIC_EMAIL;

    await transporter.sendMail({
      from: email,
      to: toEmail,
      subject: `Messaggio da ${name}`,
      text: message,
    });

    res.json({ status: "ok", message: "Messaggio inviato!" });
  } catch (err) {
    console.error("Errore invio email:", err);
    res.status(500).json({
      status: "error",
      message: "Errore nell'invio del messaggio"
    });
  }
});



// Funzione asincrona per avviare il server solo dopo che il DB è connesso
const startServer = async () => {
  try {
    // Aspetta la connessione al database
    await connectDB();
    console.log("Database connesso correttamente!"); // Stampa messaggio se va tutto bene

    // porta su cui il server ascolterà le richieste
    // Usa PORT dal .env oppure fallback a 5000 se non definita
    const PORT = process.env.PORT || 5000;

    // Avvio del server Express
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`); // quando il server parte
    });
  } catch (error) {
    // Se c'è un errore nella connessione al DB, stampa l'errore
    console.error("Errore avvio server:", error);

    // Blocca l'esecuzione del server se il database non è disponibile
    process.exit(1);
  }
};

// Chiamiamo la funzione per far partire il server
startServer();
