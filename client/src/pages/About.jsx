import { useEffect, useState } from "react";
import { Pencil } from "phosphor-react";

const API = "http://localhost:5000/api";

/** Stesso aspetto del testo pubblicato (vedi <p> sotto). !uppercase vince la regola globale su textarea in index.css. */
const aboutTextClassName =
  "font-display font-extralight tracking-widest uppercase whitespace-pre-line text-black !uppercase";

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
      <div className="flex flex-wrap gap-2 justify-between items-start">
        <h2 className="font-display font-extralight text-2xl tracking-widest uppercase text-verdoscuro">
          Chi Sono
        </h2>

        {isAdmin && (
          <div className="flex gap-2 p-2 justify-end shrink-0">
            <button
              type="button"
              className={`btn-edit-gallery ${editing ? "btn-edit-gallery-active" : ""}`}
              onClick={toggleEdit}
              title={editing ? "Chiudi" : "Modifica"}
            >
              <Pencil size={22} className="text-white" />
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="h-40 bg-gray-200 animate-pulse rounded" />
      ) : (
        <>
          {isAdmin && editing ? (
            <div className="space-y-4">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={14}
                className={`w-full min-h-[14rem] resize-y border border-gray-300 rounded bg-transparent p-0 leading-relaxed outline-none focus:ring-1 focus:ring-[var(--color-verdolight)] ${aboutTextClassName}`}
              />
              <div className="flex gap-4 justify-end">
                <button type="button" className="btn-secondary" onClick={cancelEdit}>
                  Annulla
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSaveText}
                  disabled={!textDirty}
                >
                  Salva testo
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
