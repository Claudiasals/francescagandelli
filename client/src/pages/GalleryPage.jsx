import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Pencil, ArrowsClockwise, Plus, Trash } from "phosphor-react";

const API = "http://localhost:5000/api/gallery";

/**
 * Galleria unificata: didascalie solo in MAIUSCOLO; testo come Privacy/Cookie/Termini (paragrafo, senza riquadri).
 */
const GalleryPage = () => {
  const location = useLocation();
  const params = useParams();

  const slug = useMemo(() => {
    if (params.slug) return params.slug;
    const path = location.pathname.replace(/^\//, "");
    return path.split("/")[0] || "";
  }, [location.pathname, params.slug]);

  const isAdmin = !!localStorage.getItem("adminToken");
  const token = () => localStorage.getItem("adminToken");

  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [reorderMode, setReorderMode] = useState(false);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [uploadCaptionDraft, setUploadCaptionDraft] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const uploadFileInputRef = useRef(null);

  /** Bozze didascalie in modalità modifica (allineate ai dati server quando cambiano le foto). */
  const [captionDrafts, setCaptionDrafts] = useState({});
  const [savingCaptions, setSavingCaptions] = useState(false);

  const dragIndexRef = useRef(null);
  /** Feedback durante il riordino: cella sotto il cursore e foto trascinata. */
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const loadGallery = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/${encodeURIComponent(slug)}`);
      const data = await res.json();
      if (data.title) setTitle(data.title);
      if (Array.isArray(data.photos)) setPhotos(data.photos);
    } catch (err) {
      console.error("Errore caricamento galleria:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  /** In modifica: inizializza o aggiunge nuove foto senza cancellare le bozze già modificate. */
  useEffect(() => {
    if (!editMode) {
      setCaptionDrafts({});
      return;
    }
    setCaptionDrafts((prev) => {
      const next = { ...prev };
      const ids = new Set(photos.map((p) => p._id));
      photos.forEach((p) => {
        if (next[p._id] === undefined) {
          next[p._id] = (p.caption || "").toUpperCase();
        }
      });
      Object.keys(next).forEach((id) => {
        if (!ids.has(id)) delete next[id];
      });
      return next;
    });
  }, [editMode, photos]);

  useEffect(() => {
    if (!reorderMode) {
      setDragOverIndex(null);
      setDraggingIndex(null);
    }
  }, [reorderMode]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  /** Clic su +: subito finestra di scelta file; dopo la scelta si apre il modale con anteprima e didascalia. */
  const openFilePicker = () => {
    uploadFileInputRef.current?.click();
  };

  const handleUploadFileChosen = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Seleziona un file immagine.");
      return;
    }
    setPendingFile(file);
    setUploadCaptionDraft("");
    setPreviewUrl(URL.createObjectURL(file));
    setUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setPendingFile(null);
    setUploadCaptionDraft("");
    setPreviewUrl(null);
  };

  /** Un solo salvataggio: tutte le didascalie modificate, poi esci dalla modifica. */
  const handleSaveAllCaptions = async () => {
    if (photos.length === 0) return;
    setSavingCaptions(true);
    try {
      let nextPhotos = photos;
      for (const photo of photos) {
        const caption = (captionDrafts[photo._id] ?? "").trim().toUpperCase();
        const serverCaption = (photo.caption || "").trim().toUpperCase();
        if (caption === serverCaption) continue;

        const res = await fetch(`${API}/${encodeURIComponent(slug)}/${photo._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`,
          },
          body: JSON.stringify({ caption }),
        });
        if (res.status === 401) {
          alert("Sessione scaduta, rieffettua il login");
          return;
        }
        if (!res.ok) {
          alert("Errore nel salvataggio di una didascalia. Riprova.");
          return;
        }
        const doc = await res.json();
        nextPhotos = nextPhotos.map((x) => (x._id === doc._id ? { ...x, ...doc } : x));
      }
      setPhotos(nextPhotos);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Errore di rete durante il salvataggio.");
    } finally {
      setSavingCaptions(false);
    }
  };

  const handleConfirmUpload = async () => {
    if (!pendingFile) {
      alert("Seleziona un file immagine.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", pendingFile);
    formData.append("caption", uploadCaptionDraft.trim().toUpperCase());

    try {
      const res = await fetch(`${API}/${encodeURIComponent(slug)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token()}` },
        body: formData,
      });
      if (res.status === 401) {
        alert("Sessione scaduta, rieffettua il login");
        return;
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "Errore caricamento");
        return;
      }
      const doc = await res.json();
      setPhotos((prev) => [...prev, doc].sort((a, b) => a.order - b.order));
      closeUploadModal();
    } catch (err) {
      console.error(err);
    }
  };

  const persistReorder = async (next) => {
    try {
      const res = await fetch(`${API}/${encodeURIComponent(slug)}/reorder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ ids: next.map((p) => p._id) }),
      });
      if (res.status === 401) {
        alert("Sessione scaduta, rieffettua il login");
        return;
      }
      const data = await res.json();
      if (!res.ok) return;
      if (Array.isArray(data.photos)) setPhotos(data.photos);
    } catch (err) {
      console.error(err);
    }
  };

  /** WebKit emette spesso dragend prima di drop: usiamo dataTransfer, non solo ref. */
  const handleDragStart = (e, index) => {
    dragIndexRef.current = index;
    setDraggingIndex(index);
    setDragOverIndex(null);
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    dragIndexRef.current = null;
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOverCell = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggingIndex === null) return;
    setDragOverIndex((prev) => (prev !== index ? index : prev));
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    setDragOverIndex(null);
    setDraggingIndex(null);
    const raw = e.dataTransfer.getData("text/plain");
    let from = raw !== "" ? parseInt(raw, 10) : dragIndexRef.current;
    if (from === null || Number.isNaN(from)) return;
    dragIndexRef.current = null;
    if (from === dropIndex) return;

    const next = [...photos];
    const [removed] = next.splice(from, 1);
    next.splice(dropIndex, 0, removed);
    setPhotos(next);
    persistReorder(next);
  };

  const handleDelete = async (photo) => {
    if (!window.confirm("Rimuovere questa foto dalla galleria?")) return;

    try {
      const res = await fetch(`${API}/${encodeURIComponent(slug)}/${photo._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      if (res.status === 401) {
        alert("Sessione scaduta, rieffettua il login");
        return;
      }
      const data = await res.json();
      if (!res.ok) return;
      if (Array.isArray(data.photos)) setPhotos(data.photos);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleReorderMode = () => {
    setReorderMode((r) => !r);
    setEditMode(false);
  };

  /** Chiude la modalità riordino: il tasto frecce torna verde chiaro come gli altri (l’ordine è già salvato a ogni spostamento). */
  const finishReorderMode = () => {
    setReorderMode(false);
    setDragOverIndex(null);
    setDraggingIndex(null);
  };

  const toggleEditMode = () => {
    setEditMode((e) => !e);
    setReorderMode(false);
  };

  /** Due colonne indipendenti (pari/dispari): niente “buchi” verticali come in grid quando le altezze differiscono. */
  const renderPhotoCard = (photo, index) => {
    const showDropTarget =
      reorderMode &&
      isAdmin &&
      draggingIndex !== null &&
      dragOverIndex === index &&
      draggingIndex !== index;

    return (
      <div
        key={photo._id}
        draggable={isAdmin && reorderMode}
        onDragStart={(e) => handleDragStart(e, index)}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => handleDragOverCell(e, index)}
        onDrop={(e) => handleDrop(e, index)}
        className={`relative flex min-w-0 w-full flex-col select-none transition-shadow duration-150 ${
          reorderMode && isAdmin ? "cursor-grab active:cursor-grabbing [&>*]:pointer-events-none" : ""
        } ${reorderMode && isAdmin && draggingIndex === index ? "opacity-50" : ""} ${
          showDropTarget
            ? "z-10 rounded-sm shadow-[0_0_0_3px_var(--color-verdoscuro),0_12px_40px_rgba(30,67,29,0.35)] ring-2 ring-[var(--color-verdoscuro)] ring-offset-2 ring-offset-white"
            : ""
        }`}
      >
        {showDropTarget && (
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1 left-0 right-0 z-30 h-1.5 rounded-sm bg-[var(--color-verdoscuro)] shadow-md"
          />
        )}
        {isAdmin && editMode && (
          <button
            type="button"
            className="absolute top-2 right-2 z-10 btn-edit-gallery"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(photo);
            }}
            title="Elimina la foto dalla galleria"
          >
            <Trash size={20} className="text-white" />
          </button>
        )}

        <div className="w-full shadow-md">
          <img
            src={photo.imageUrl}
            alt={photo.caption || ""}
            className="block h-auto w-full max-w-full align-top"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="gallery-caption-slot">
          {isAdmin && editMode ? (
            <textarea
              value={captionDrafts[photo._id] ?? ""}
              onChange={(e) =>
                setCaptionDrafts((prev) => ({
                  ...prev,
                  [photo._id]: e.target.value.toUpperCase(),
                }))
              }
              rows={2}
              placeholder="SOLO MAIUSCOLO"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={500}
              className="gallery-caption-input"
            />
          ) : (
            <p
              className="gallery-caption"
              title={photo.caption?.trim() ? photo.caption.trim().toUpperCase() : undefined}
            >
              {photo.caption?.trim() ? photo.caption.trim().toUpperCase() : "\u00A0"}
            </p>
          )}
        </div>
      </div>
    );
  };

  if (!slug) {
    return (
      <section className="max-w-6xl mx-auto p-8 space-y-4">
        <p className="text-gray-600">Sezione non trovata.</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto p-8 space-y-4">
      {isAdmin && (
        <input
          ref={uploadFileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-hidden
          tabIndex={-1}
          onChange={handleUploadFileChosen}
        />
      )}

      {isAdmin && uploadModalOpen && pendingFile && previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-dialog-title"
          onClick={closeUploadModal}
        >
          <div
            className="w-full max-w-md bg-white p-6 shadow-xl rounded-none border border-gray-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="upload-dialog-title"
              className="font-display font-extralight text-lg tracking-widest uppercase text-verdoscuro"
            >
              Nuova foto
            </h2>
            <div className="w-full overflow-hidden border border-gray-200 bg-gray-50">
              <img
                src={previewUrl}
                alt=""
                className="mx-auto block max-h-[min(50vh,20rem)] w-full object-contain"
              />
            </div>
            <div>
              <label htmlFor="upload-caption" className="block text-sm text-black font-extralight mb-1 normal-case">
                Didascalia
              </label>
              <textarea
                id="upload-caption"
                value={uploadCaptionDraft}
                onChange={(e) => setUploadCaptionDraft(e.target.value.toUpperCase())}
                rows={2}
                maxLength={500}
                placeholder="DIDASCALIA (SOLO MAIUSCOLO)"
                autoCapitalize="characters"
                spellCheck={false}
                className="gallery-modal-caption"
              />
            </div>
            <div className="flex flex-row justify-between gap-4 pt-2">
              <button type="button" className="btn-secondary" onClick={closeUploadModal}>
                Annulla
              </button>
              <button type="button" className="btn-primary" onClick={handleConfirmUpload}>
                Carica foto
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-between items-start mb-6">
        <h1 className="font-display font-extralight text-base tracking-widest uppercase text-verdoscuro">
          {loading ? "…" : title}
        </h1>

        {isAdmin && (
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-wrap gap-2 justify-end items-center">
              <button
                type="button"
                className={`btn-edit-gallery ${editMode ? "btn-edit-gallery-active" : ""}`}
                onClick={toggleEditMode}
                title="Modifica"
              >
                <Pencil size={22} className="text-white" />
              </button>

              <button
                type="button"
                className={`btn-edit-gallery ${reorderMode ? "btn-edit-gallery-active" : ""}`}
                onClick={toggleReorderMode}
                title="Trascina le foto per riordinarle"
              >
                <ArrowsClockwise size={22} className="text-white" />
              </button>

              <button type="button" className="btn-edit-gallery" onClick={openFilePicker} title="Aggiungi foto">
                <Plus size={24} className="text-white" />
              </button>
            </div>
            {editMode && photos.length > 0 && (
              <button
                type="button"
                className="btn-primary"
                disabled={savingCaptions}
                onClick={handleSaveAllCaptions}
              >
                {savingCaptions ? "Salvataggio…" : "Salva"}
              </button>
            )}
            {reorderMode && (
              <button type="button" className="btn-primary" onClick={finishReorderMode}>
                Salva
              </button>
            )}
          </div>
        )}
      </div>

      {isAdmin && reorderMode && (
        <p className="text-sm text-[var(--color-verdoscuro)] mb-4 text-right max-w-xl ml-auto leading-relaxed">
          Modalità riordino: trascina una foto. La striscia e l’ombra verde sulla cella indicano dove verrà
          posizionata quando rilasci.
        </p>
      )}

      {loading ? (
        <div className="h-48 bg-gray-200 animate-pulse" />
      ) : photos.length === 0 ? (
        <p className="text-gray-600 text-center py-12">
          {isAdmin ? "Nessuna foto ancora: usa il pulsante + per aggiungerne." : "Contenuto in arrivo."}
        </p>
      ) : (
        <div className="gallery-masonry-row flex flex-row items-start [&>*]:min-w-0">
          <div className="gallery-masonry-col flex min-w-0 flex-1 flex-col">
            {photos
              .map((photo, index) => ({ photo, index }))
              .filter(({ index }) => index % 2 === 0)
              .map(({ photo, index }) => renderPhotoCard(photo, index))}
          </div>
          <div className="gallery-masonry-col flex min-w-0 flex-1 flex-col">
            {photos
              .map((photo, index) => ({ photo, index }))
              .filter(({ index }) => index % 2 === 1)
              .map(({ photo, index }) => renderPhotoCard(photo, index))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryPage;
