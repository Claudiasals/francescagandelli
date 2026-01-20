// server/src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

/**
 * Middleware di autenticazione per admin
 * Controlla se la richiesta contiene un token JWT valido
 */
const authMiddleware = (req, res, next) => {
  // 1. Prendi il token dall'header Authorization: "Bearer TOKEN"
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Accesso negato: token mancante" });
  }

  const token = authHeader.split(" ")[1]; // separa "Bearer" dal token
  if (!token) {
    return res.status(401).json({ message: "Accesso negato: token non trovato" });
  }

  try {
    // 2. Verifica il token con la chiave segreta del .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Salva le info dell'admin nella richiesta per usarle dopo
    req.admin = decoded;

    // 4. Passa al prossimo middleware o route
    next();
  } catch (err) {
    // Token scaduto o non valido
    return res.status(401).json({ message: "Token non valido" });
  }
};

export default authMiddleware;
