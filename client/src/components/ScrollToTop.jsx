import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Azzera lo scroll del documento (window + html + body) per compatibilità mobile/desktop. */
function scrollDocumentToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.documentElement.scrollLeft = 0;
  document.body.scrollTop = 0;
  document.body.scrollLeft = 0;
}

/**
 * A ogni cambio di route (pathname) la pagina parte dall’alto.
 * useLayoutEffect evita il “flash” a metà pagina prima del paint; scrollRestoration
 * evita che il browser riapplichi la posizione della route precedente (tipico in SPA).
 * L’hash (#contact-form su /contact) è gestito dopo dal useEffect della pagina Contatti.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    scrollDocumentToTop();
    const id = window.requestAnimationFrame(() => {
      scrollDocumentToTop();
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
