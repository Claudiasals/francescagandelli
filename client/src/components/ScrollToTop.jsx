import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A ogni cambio di route (pathname) porta la finestra in cima, così da Impostazioni
 * le pagine legali non restano con lo scroll della pagina precedente.
 * L’hash (#contact-form su /contact) è gestito dalle singole pagine dopo il primo paint.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
