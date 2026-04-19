import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "phosphor-react";

const STORAGE_KEY = "fg_cookie_consent_v1";

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  /* Migrazione: il vecchio consenso su localStorage era permanente; ora vale solo la sessione (scheda). */
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  /*
   * sessionStorage in questa scheda: al primo ingresso vedi il banner; se accetti resta nascosto mentre navighi nel sito
   * (anche dopo refresh). Uscita dal sito → azzeriamo il consenso così al rientro il banner ricompare.
   * Chiusura scheda/browser: il sessionStorage viene comunque invalidato dal browser.
   */
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) !== "accepted") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const onPageHide = (e) => {
      if (e.persisted) return;
      let navType;
      try {
        navType = performance.getEntriesByType("navigation")[0]?.type;
      } catch {
        navType = undefined;
      }
      /* Sul refresh non cancellare, altrimenti “Accetto” si perde a ogni F5 */
      if (navType === "reload") return;
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.paddingBottom = "";
      return;
    }
    document.body.style.paddingBottom = "calc(6.5rem + env(safe-area-inset-bottom, 0px))";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  const accept = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-black/10 bg-[var(--color-white)] shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
      role="dialog"
      aria-label="Informazioni sui cookie"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8 md:py-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Cookie className="mt-0.5 shrink-0 text-[var(--color-verdoscuro)]" size={28} aria-hidden />
          <p className="text-sm font-extralight normal-case tracking-normal leading-relaxed text-[var(--color-black)]">
            Questo sito utilizza solo cookie tecnici necessari e, dove attivati, strumenti di analisi in forma
            anonima. Continuando la navigazione accetti l&apos;uso dei cookie come descritto nella nostra{" "}
            <Link
              to="/cookie-policy"
              className="font-normal text-[var(--color-verdolight)] underline underline-offset-4 transition-colors hover:text-[var(--color-verdoscuro)]"
            >
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 justify-end md:justify-center">
          <button type="button" onClick={accept} className="btn-primary px-6 py-2.5 text-sm uppercase tracking-widest">
            Accetto
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
