import { Pencil, Check, X } from "phosphor-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSiteSettings } from "../context/SiteSettingsContext.jsx";
import EditablePageText from "../components/EditablePageText.jsx";

import { API_BASE } from "../config/api.js";

const API = API_BASE;

const introClass =
  "text-sm font-display font-extralight tracking-widest uppercase whitespace-pre-wrap text-black !uppercase break-words [overflow-wrap:anywhere]";

/** Estrae lo username dal link Instagram (es. …/francescagandelli_ph/). */
function instagramUsernameFromUrl(url) {
  if (!url || typeof url !== "string") return "";
  const m = url.trim().match(/instagram\.com\/([^/?#]+)/i);
  return m ? m[1].replace(/\/$/, "") : "";
}

const Contact = () => {
  const isAdmin = !!localStorage.getItem("adminToken");
  const { publicEmail, phoneTel, phoneDisplay, instagramUrl, refresh } = useSiteSettings();
  const instagramUser = instagramUsernameFromUrl(instagramUrl);
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [introText, setIntroText] = useState("");
  const [formLeadText, setFormLeadText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editIntro, setEditIntro] = useState("");
  const [editFormLead, setEditFormLead] = useState("");

  const token = () => localStorage.getItem("adminToken");

  const loadContactPage = async () => {
    try {
      const res = await fetch(`${API}/contact-page`);
      const data = await res.json();
      if (typeof data.introText === "string") setIntroText(data.introText);
      if (typeof data.formLeadText === "string") setFormLeadText(data.formLeadText);
    } catch (err) {
      console.error("Errore caricamento testi Contatti:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContactPage();
  }, []);

  /* Allinea email / telefono / Instagram a quanto salvato in Impostazioni (anche se aggiornati da un’altra scheda). */
  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (location.hash === "#contact-form") {
      const el = document.getElementById("contact-form");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash, location.pathname]);

  const handleSaveText = async () => {
    try {
      const res = await fetch(`${API}/contact-page/text`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ introText: editIntro, formLeadText: editFormLead }),
      });
      if (res.status === 401) {
        alert("Sessione scaduta, rieffettua il login");
        return;
      }
      if (!res.ok) {
        console.error("Errore salvataggio testi contatti");
        return;
      }
      const data = await res.json();
      setIntroText(data.introText);
      setFormLeadText(data.formLeadText);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    if (editIntro !== introText || editFormLead !== formLeadText) {
      if (!window.confirm("Annullare le modifiche non salvate?")) return;
    }
    setEditing(false);
  };

  const toggleEdit = () => {
    if (!editing) {
      setEditIntro(introText);
      setEditFormLead(formLeadText);
      setEditing(true);
      return;
    }
    if (editIntro === introText && editFormLead === formLeadText) {
      setEditing(false);
      return;
    }
    if (window.confirm("Annullare le modifiche non salvate?")) {
      setEditing(false);
    }
  };

  const textDirty =
    editing && (editIntro !== introText || editFormLead !== formLeadText);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    if (!form.name.value || !form.email.value || !form.message.value) {
      setErrorMessage("Compila tutti i campi mancanti");
      return;
    }

    try {
      const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.value)) {
        setErrorMessage("Inserisci un indirizzo email valido");
        return;
      }

      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === "ok") {
        setSubmitted(true);
        form.reset();
        setErrorMessage("");
      } else {
        setErrorMessage(result.message || "Errore invio messaggio dal server");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Errore di connessione. Riprova più tardi.");
    }
  };

  return (
    <section className="contact-section w-full min-w-0 max-w-2xl mx-auto box-border px-4 py-8 sm:px-8 space-y-6">
      <div
        className={
          isAdmin
            ? "grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 gap-y-2"
            : "grid grid-cols-1 justify-items-center"
        }
      >
        {isAdmin ? <span className="min-w-0 shrink" aria-hidden /> : null}
        <h2 className="text-center font-display font-extralight text-2xl tracking-widest uppercase text-verdoscuro">
          Contattami
        </h2>

        {isAdmin && (
          <div className="flex shrink-0 flex-nowrap items-center justify-end gap-2 self-start p-2">
            {editing && (
              <>
                <button
                  type="button"
                  className="btn-cancel-icon"
                  onClick={cancelEdit}
                  title="Annulla"
                  aria-label="Annulla"
                >
                  <X size={18} weight="bold" aria-hidden />
                </button>
                <button
                  type="button"
                  className="btn-confirm-icon"
                  onClick={handleSaveText}
                  disabled={!textDirty}
                  title="Salva le modifiche"
                >
                  <Check size={22} weight="bold" />
                </button>
              </>
            )}
            <button
              type="button"
              className={`btn-edit-gallery ${editing ? "btn-edit-gallery-active" : ""}`}
              onClick={toggleEdit}
              title={editing ? "Chiudi" : "Modifica"}
            >
              <Pencil size={22} weight="duotone" className="text-white" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center gap-6 min-w-0 w-full">
        {loading ? (
          <div className="h-40 bg-gray-200 animate-pulse rounded" />
        ) : isAdmin && editing ? (
          <div className="space-y-8 w-full min-w-0">
            <EditablePageText
              value={editIntro}
              onChange={setEditIntro}
              className={`leading-relaxed ${introClass}`}
              aria-label="Testo introduttivo contatti"
            />
            <div className="w-full pt-2">
              <EditablePageText
                value={editFormLead}
                onChange={setEditFormLead}
                className="text-base font-extralight leading-relaxed whitespace-pre-wrap break-words text-[var(--color-verdolight)] [overflow-wrap:anywhere]"
                aria-label="Testo sopra il modulo di contatto"
              />
            </div>
          </div>
        ) : (
          <p className={introClass}>{introText}</p>
        )}
      </div>

      <div className="flex flex-col gap-8 min-w-0 w-full">
        {errorMessage && (
          <p className="text-red-600 font-semibold">{errorMessage}</p>
        )}

        {!submitted && !loading && !(isAdmin && editing) ? (
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="flex w-full min-w-0 max-w-full flex-col gap-4 pt-2 box-border"
          >
            <p className="text-base font-extralight whitespace-pre-wrap break-words text-[var(--color-verdolight)] [overflow-wrap:anywhere]">
              {formLeadText}
            </p>

            <label className="flex min-w-0 w-full max-w-full flex-col">
              <input
                type="text"
                name="name"
                className="mt-1 box-border w-full min-w-0 max-w-full rounded border border-gray-300 p-2"
                placeholder="NOME"
              />
            </label>
            <label className="flex min-w-0 w-full max-w-full flex-col">
              <input
                type="email"
                name="email"
                className="mt-1 box-border w-full min-w-0 max-w-full rounded border border-gray-300 p-2"
                placeholder="EMAIL"
              />
            </label>
            <label className="flex min-w-0 w-full max-w-full flex-col">
              <textarea
                name="message"
                rows="5"
                className="mt-1 box-border w-full min-w-0 max-w-full resize-y rounded border border-gray-300 p-2"
                placeholder="MESSAGGIO"
              />
            </label>

            <div className="flex justify-end">
              <button type="submit" className="btn-contact-submit max-w-full">
                Invia
              </button>
            </div>
          </form>
        ) : !submitted && loading ? null : !submitted ? null : (
          <p>Grazie per il messaggio!</p>
        )}

        {!(isAdmin && editing) && (
          <div className="-mt-2 mb-12 flex min-w-0 w-full max-w-full flex-col items-center gap-1.5 text-center">
            <a
              href={`mailto:${publicEmail}`}
              className="block w-full max-w-full min-w-0 break-words text-sm text-black transition-colors duration-200 [overflow-wrap:anywhere] hover:text-[var(--color-verdolight)]"
            >
              email: {publicEmail}
            </a>

            <a
              href={`tel:${phoneTel}`}
              className="block w-full max-w-full min-w-0 break-words text-sm text-black transition-colors duration-200 [overflow-wrap:anywhere] hover:text-[var(--color-verdolight)]"
            >
              telefono: {phoneDisplay}
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-full min-w-0 break-words text-sm text-black transition-colors duration-200 [overflow-wrap:anywhere] hover:text-[var(--color-verdolight)]"
            >
              {instagramUser ? `Instagram: ${instagramUser}` : "Instagram"}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
