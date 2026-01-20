// Express il framework per creare il server HTTP
import express from "express";

// dotenv per leggere le variabili d'ambiente dal file .env
import dotenv from "dotenv";

// funzione per connetterci a MongoDB (db.js)
import connectDB from "./config/db.js";

// importo le rotte per l'autenticazione
import authRoutes from "./routes/authRoute.js";

// Carico le variabili d'ambiente presenti nel file .env
dotenv.config();


// Creo l'istanza dell'app Express
const app = express();


// Middleware per leggere automaticamente il JSON presente 
// nel body delle richieste (utile per POST, PUT, PATCH)
app.use(express.json());

// Collegamento delle rotte auth
app.use("/api/auth", authRoutes);


// Rotta di test per verificare che il server funzioni
app.get("/", (req, res) => {
  res.send("Server Francesca Gandelli Portfolio OK");
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
