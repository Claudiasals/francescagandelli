// importo mongoose (libreria per parlare con MongoDB)
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

// funzione asincrona per connettersi al database
const connectDB = async () => {
  try {
    // mongoose.connect usa la stringa MONGO_URI dal file .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // se la connessione va a buon fine, stampa un messaggio
    console.log(`MongoDB connesso: ${conn.connection.host}`);
  } catch (error) {
    // se c'è un errore lo mostra
    console.error("Errore connessione MongoDB:", error.message);

    // blocco il server, chiudo il processo se il DB non è disponibile
    process.exit(1);
  }
};

// esporto la funzione per usarla in server.js
export default connectDB;
