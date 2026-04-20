import { useEffect, useState } from "react";
import { Pencil, Check, X } from "phosphor-react";
import EditablePageText from "../components/EditablePageText.jsx";

import { API_BASE } from "../config/api.js";

const API = API_BASE;

/** Stesso aspetto del testo pubblicato (vedi <p> sotto). !uppercase vince la regola globale su textarea in index.css. */
const aboutTextClassName =
  "text-sm font-display font-extralight tracking-widest uppercase whitespace-pre-line text-black !uppercase";

const About = () => {
  const isAdmin = !!localStorage.getItem("adminToken");

  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const loadAbout = async () => {
    try {
      const res = await fetch(`${API}/about`);
      const data = await res.json();
      if (data.text) setText(data.text);
    } catch (err) {
      console.error("Errore caricamento Chi Sono:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAbout();
  }, []);

  const token = () => localStorage.getItem("adminToken");

  const handleSaveText = async () => {
    try {
      const res = await fetch(`${API}/about/text`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ text: editText }),
      });
      if (res.status === 401) {
        alert("Sessione scaduta, rieffettua il login");
        return;
      }
      if (!res.ok) {
        console.error("Errore salvataggio testo");
        return;
      }
      const data = await res.json();
      setText(data.text);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    if (editText !== text) {
      if (!window.confirm("Annullare le modifiche non salvate?")) return;
    }
    setEditing(false);
  };

  const toggleEdit = () => {
    if (!editing) {
      setEditText(text);
      setEditing(true);
      return;
    }
    if (editText === text) {
      setEditing(false);
      return;
    }
    if (window.confirm("Annullare le modifiche non salvate?")) {
      setEditing(false);
    }
  };

  const textDirty = editing && editText !== text;

  return (
    <section className="about-section p-8 max-w-2xl mx-auto space-y-6">
      <div
        className={
          isAdmin
            ? "grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 gap-y-2"
            : "grid grid-cols-1 justify-items-center"
        }
      >
        {isAdmin ? <span className="min-w-0 shrink" aria-hidden /> : null}
        <h2 className="text-center font-display font-extralight text-2xl tracking-widest uppercase text-verdoscuro">
          Chi Sono
        </h2>

        {isAdmin && (
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 p-2">
            {editing && (
              <button
                type="button"
                className="btn-confirm-icon"
                onClick={handleSaveText}
                disabled={!textDirty}
                title="Salva le modifiche"
              >
                <Check size={22} weight="bold" />
              </button>
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

      {loading ? (
        <div className="h-40 bg-gray-200 animate-pulse rounded" />
      ) : (
        <>
          {isAdmin && editing ? (
            <div className="space-y-4 w-full">
              <EditablePageText
                value={editText}
                onChange={setEditText}
                className={`leading-relaxed ${aboutTextClassName}`}
                aria-label="Testo Chi sono"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="btn-cancel-icon"
                  onClick={cancelEdit}
                  title="Annulla"
                  aria-label="Annulla"
                >
                  <X size={18} weight="bold" aria-hidden />
                </button>
              </div>
            </div>
          ) : (
            <p className={aboutTextClassName}>{text}</p>
          )}
        </>
      )}
    </section>
  );
};

export default About;
