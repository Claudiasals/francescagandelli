import { Navigate } from "react-router-dom";

// AdminGuard è un componente wrapper che protegge le pagine
const AdminGuard = ({ children }) => {
  const token = localStorage.getItem("adminToken"); // legge il token salvato in locale

  if (!token) {
    // Se non c’è token l’utente viene reindirizzato al login
    // replace = evita che l’utente possa usare il tasto “indietro” del browser per tornare alla pagina protetta
    return <Navigate to="/login" replace />;
  }

  // Se c’è token renderizza i children, cioè tutto quello che è racchiuso dentro AdminGuard
  return children;
};

export default AdminGuard;
