import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import { Pencil, ArrowsClockwise, Plus, Check, X } from "phosphor-react";

import { API_BASE } from "../config/api.js";

const API = API_BASE;

const Home = () => {
  const isAdmin = !!localStorage.getItem("adminToken");

  const [coverFile, setCoverFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [coverLoading, setCoverLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [reorderMode, setReorderMode] = useState(false);
  /** Bozze modifiche categorie esistenti (conferma con l’icona ✓ in alto). */
  const [categoryEdits, setCategoryEdits] = useState({});

  const dragIndexRef = useRef(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const revokeEditPreviews = (edits) => {
    Object.values(edits).forEach((d) => {
      if (d?.localPreview) URL.revokeObjectURL(d.localPreview);
    });
  };

  const isCategoryDirty = (cat, d) => {
    if (!d) return false;
    return (
      d.title !== cat.title ||
      d.description !== cat.description ||
      d.imageFile != null
    );
  };

  const hasPendingWork = () => {
    const dirtyCat = categories.some((c) => isCategoryDirty(c, categoryEdits[c._id]));
    const partialCreate =
      showForm && (categoryTitle || categoryDescription || categoryImage || categoryImagePreview);
    return dirtyCat || partialCreate;
  };

  const token = () => localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchCover = async () => {
      try {
        const res = await fetch(`${API}/cover`);
        const data = await res.json();
        if (data.coverUrl) setCoverUrl(data.coverUrl);
      } catch (err) {
        console.error("Errore fetch copertina:", err);
      } finally {
        setCoverLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API}/categories`);
        const data = await res.json();
        if (Array.isArray(data.categories)) setCategories(data.categories);
      } catch (err) {
        console.error("Errore fetch categorie:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCover();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!reorderMode) {
      setDragOverIndex(null);
      setDraggingIndex(null);
    }
  }, [reorderMode]);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSaveCover = async () => {
    if (!coverFile) return;
    const formData = new FormData();
    formData.append("cover", coverFile);

    try {
      const response = await fetch(`${API}/cover`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token()}` },
        body: formData,
      });
      if (response.status === 401) {
        alert("Sessione scaduta, rieffettua il login");
        return;
      }
      let data = null;
      try {
        data = await response.json();
      } catch {
        console.error("Risposta non JSON dal backend");
      }
      if (!response.ok) {
        console.error("Errore backend:", data);
        return;
      }
      setCoverUrl(data.coverUrl + "?t=" + Date.now());
      setPreview(null);
      setCoverFile(null);
    } catch (err) {
      console.error("Errore upload:", err);
    }
  };

  const resetForm = () => {
    if (categoryImagePreview) URL.revokeObjectURL(categoryImagePreview);
    setCategoryTitle("");
    setCategoryDescription("");
    setCategoryImage(null);
    setCategoryImagePreview(null);
  };

  const clearCategoryEdits = () => {
    setCategoryEdits((prev) => {
      revokeEditPreviews(prev);
      return {};
    });
  };

  const updateDraft = (id, patch) => {
    setCategoryEdits((prev) => {
      const cat = categories.find((c) => c._id === id);
      if (!cat) return prev;
      const cur = prev[id] || {
        title: cat.title,
        description: cat.description,
        imageFile: null,
        localPreview: null,
      };
      return { ...prev, [id]: { ...cur, ...patch } };
    });
  };

  const handleCategoryImageFile = (id, file) => {
    if (!file) return;
    setCategoryEdits((prev) => {
      const cat = categories.find((c) => c._id === id);
      if (!cat) return prev;
      const cur = prev[id] || {
        title: cat.title,
        description: cat.description,
        imageFile: null,
        localPreview: null,
      };
      if (cur.localPreview) URL.revokeObjectURL(cur.localPreview);
      return {
        ...prev,
        [id]: {
          ...cur,
          imageFile: file,
          localPreview: URL.createObjectURL(file),
        },
      };
    });
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
    setReorderMode(false);
  };

  const saveAllChanges = async () => {
    for (const cat of categories) {
      const d = categoryEdits[cat._id];
      if (!d || !isCategoryDirty(cat, d)) continue;
      if (!d.title?.trim() || !d.description?.trim()) {
        alert("Titolo e descrizione sono obbligatori per ogni categoria modificata.");
        return;
      }
    }

    const createTentativo =
      showForm && (categoryTitle || categoryDescription || categoryImage);
    if (createTentativo) {
      if (!categoryTitle || !categoryDescription || !categoryImage) {
        alert(
          "Completa tutti i campi della nuova categoria (immagine inclusa) oppure usa la X rossa per chiudere il blocco nuova categoria."
        );
        return;
      }
    }

    try {
      for (const cat of categories) {
        const d = categoryEdits[cat._id];
        if (!d || !isCategoryDirty(cat, d)) continue;
        const formData = new FormData();
        formData.append("title", d.title.trim());
        formData.append("description", d.description.trim());
        if (d.imageFile) formData.append("image", d.imageFile);
        const res = await fetch(`${API}/categories/${cat._id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token()}` },
          body: formData,
        });
        if (res.status === 401) {
          alert("Sessione scaduta, rieffettua il login");
          return;
        }
        const errData = !res.ok ? await res.json().catch(() => ({})) : null;
        if (!res.ok) {
          alert(errData?.message || "Errore aggiornamento categoria");
          return;
        }
      }

      if (showForm && categoryTitle && categoryDescription && categoryImage) {
        const formData = new FormData();
        formData.append("title", categoryTitle);
        formData.append("description", categoryDescription);
        formData.append("image", categoryImage);
        const res = await fetch(`${API}/categories/create`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token()}` },
          body: formData,
        });
        if (res.status === 401) {
          alert("Sessione scaduta, rieffettua il login");
          return;
        }
        const data = await res.json();
        if (!res.ok) {
          alert(data.message || "Errore creazione categoria");
          return;
        }
      }

      revokeEditPreviews(categoryEdits);
      setCategoryEdits({});
      resetForm();
      setShowForm(false);
      setEditMode(false);

      const resList = await fetch(`${API}/categories`);
      const dataList = await resList.json();
      if (Array.isArray(dataList.categories))
        setCategories([...dataList.categories].sort((a, b) => a.order - b.order));
    } catch (err) {
      console.error(err);
      alert("Errore durante il salvataggio");
    }
  };

  const handleDeleteCategory = async (cat) => {
    if (!window.confirm(`Eliminare la categoria "${cat.title}"?`)) return;

    try {
      const res = await fetch(`${API}/categories/${cat._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      if (res.status === 401) {
        alert("Sessione scaduta, rieffettua il login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Errore eliminazione");
        return;
      }
      if (Array.isArray(data.categories)) setCategories(data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const persistReorder = async (next) => {
    try {
      const res = await fetch(`${API}/categories/reorder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ ids: next.map((c) => c._id) }),
      });
      if (res.status === 401) {
        alert("Sessione scaduta, rieffettua il login");
        return;
      }
      const data = await res.json();
      if (!res.ok) return;
      if (Array.isArray(data.categories)) setCategories(data.categories);
    } catch (err) {
      console.error(err);
    }
  };

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

    const next = [...categories];
    [next[from], next[dropIndex]] = [next[dropIndex], next[from]];
    setCategories(next);
    persistReorder(next);
  };

  const toggleReorderMode = () => {
    if (!reorderMode) {
      if (editMode && hasPendingWork()) {
        if (!window.confirm("Passando al riordino le modifiche non salvate andranno perse. Continuare?")) return;
        revokeEditPreviews(categoryEdits);
        setCategoryEdits({});
        resetForm();
      }
      setEditMode(false);
      setShowForm(false);
    }
    setReorderMode((r) => !r);
  };

  /** Chiude il riordino: l’ordine è già salvato a ogni rilascio; il pulsante matita/frecce torna verde chiaro come gli altri. */
  const finishReorderMode = () => {
    setReorderMode(false);
    setDragOverIndex(null);
    setDraggingIndex(null);
    dragIndexRef.current = null;
  };

  const toggleEditMode = () => {
    if (editMode) {
      if (hasPendingWork() && !window.confirm("Annullare le modifiche non salvate?")) return;
      revokeEditPreviews(categoryEdits);
      setCategoryEdits({});
      resetForm();
      setShowForm(false);
      setEditMode(false);
    } else {
      setEditMode(true);
    }
    setReorderMode(false);
  };

  return (
    <>
      <section className="relative w-full h-64 md:h-96 overflow-hidden">
        {isAdmin && (
          <div className="absolute top-4 right-4 z-10 flex flex-wrap items-center justify-end gap-2">
            {coverFile && (
              <button
                type="button"
                onClick={handleSaveCover}
                className="btn-confirm-icon"
                title="Applica la nuova copertina"
              >
                <Check size={22} weight="bold" />
              </button>
            )}
            <label className="btn-edit-gallery">
              <Pencil size={24} weight="duotone" className="text-white" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverChange}
              />
            </label>
          </div>
        )}

        {coverLoading ? (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        ) : (
          <img
            src={preview || coverUrl}
            alt="Copertina"
            className="h-full w-full object-cover"
          />
        )}
      </section>

      <section className="px-8 pb-8 pt-[22px] md:mt-15 mb-16">
        <div className="flex flex-col gap-2">
          {isAdmin && (
            <div className="flex flex-wrap gap-2 items-center justify-end">
              {(editMode || showForm || reorderMode) && (
                <button
                  type="button"
                  className="btn-confirm-icon"
                  onClick={() => {
                    if (reorderMode) finishReorderMode();
                    else saveAllChanges();
                  }}
                  title={
                    reorderMode
                      ? "Chiudi riordino (l’ordine è già salvato a ogni spostamento)"
                      : "Applica tutte le modifiche alle categorie e la nuova categoria (se presente)"
                  }
                >
                  <Check size={22} weight="bold" />
                </button>
              )}
              <button
                type="button"
                className={`btn-edit-gallery ${editMode ? "btn-edit-gallery-active" : ""}`}
                onClick={toggleEditMode}
                title="Attiva o disattiva modifica sulle card"
              >
                <Pencil size={22} weight="duotone" className="text-white" />
              </button>

              <button
                type="button"
                className={`btn-edit-gallery ${reorderMode ? "btn-edit-gallery-active" : ""}`}
                onClick={toggleReorderMode}
                title="Trascina le card per riordinarle"
              >
                <ArrowsClockwise size={22} className="text-white" />
              </button>

              <button
                type="button"
                className="btn-edit-gallery"
                onClick={openCreateForm}
                title="Aggiungi una nuova categoria"
              >
                <Plus size={24} weight="duotone" className="text-white" />
              </button>
            </div>
          )}

          {isAdmin && editMode && (
            <p className="w-full text-center md:text-right text-sm font-extralight tracking-wide text-[var(--color-verdoscuro)] max-w-3xl ml-auto">
              Clicca su foto, titolo o sottotitolo per modificarli.
            </p>
          )}

          {isAdmin && reorderMode && (
            <p className="text-sm text-center md:text-right text-[var(--color-verdoscuro)] max-w-xl ml-auto leading-relaxed">
              Trascina le categorie per modificarne l'ordine.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[9px] items-stretch">
          {showForm && (
            <div className="card flex h-full min-w-0 flex-col transition-shadow duration-200 ease-in-out">
              <label className="h-48 w-full shrink-0 bg-gray-200 flex cursor-pointer items-center justify-center overflow-hidden">
                {categoryImagePreview ? (
                  <img
                    src={categoryImagePreview}
                    alt="Anteprima"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 text-center text-sm px-2">Carica immagine</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (categoryImagePreview) URL.revokeObjectURL(categoryImagePreview);
                    setCategoryImage(file);
                    setCategoryImagePreview(URL.createObjectURL(file));
                  }}
                />
              </label>

              <div className="flex h-[11rem] shrink-0 flex-col justify-start gap-2 overflow-y-auto overflow-x-hidden bg-white p-4 py-3 text-center">
                <input
                  type="text"
                  placeholder="Titolo (es. Famiglia)"
                  value={categoryTitle}
                  onChange={(e) => setCategoryTitle(e.target.value)}
                  className="min-w-0 w-full shrink-0 break-words text-center text-lg outline-none [overflow-wrap:anywhere]"
                />
                <textarea
                  placeholder="Sottotitolo / descrizione (es. Momenti in famiglia)"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="min-h-[4rem] min-w-0 w-full flex-1 resize-none break-words text-center text-sm outline-none [overflow-wrap:anywhere]"
                />
              </div>
              <div className="flex shrink-0 justify-center border-t border-black/10 bg-white px-4 pb-4 pt-3">
                <button
                  type="button"
                  className="btn-cancel-icon"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  title="Annulla"
                  aria-label="Annulla"
                >
                  <X size={18} weight="bold" aria-hidden />
                </button>
              </div>
            </div>
          )}

          {categoriesLoading ? (
            <div className="col-span-full h-48 bg-gray-200 animate-pulse rounded" />
          ) : (
            categories.map((cat, index) => {
              const showDropTarget =
                reorderMode &&
                isAdmin &&
                draggingIndex !== null &&
                dragOverIndex === index &&
                draggingIndex !== index;
              return (
                <div
                  key={cat._id}
                  draggable={isAdmin && reorderMode}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOverCell(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`h-full min-w-0 ${reorderMode && isAdmin ? "rounded [&>*]:pointer-events-none" : ""} ${
                    reorderMode && isAdmin && draggingIndex === index ? "opacity-50" : ""
                  } ${showDropTarget ? "z-10 overflow-visible" : ""}`}
                >
                  <Card
                    category={cat}
                    draft={categoryEdits[cat._id]}
                    imageUrl={cat.imageUrl}
                    isAdmin={isAdmin}
                    editMode={editMode}
                    reorderMode={reorderMode}
                    reorderDropTarget={showDropTarget}
                    onDraftChange={updateDraft}
                    onImageFile={handleCategoryImageFile}
                    onDelete={() => handleDeleteCategory(cat)}
                  />
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
