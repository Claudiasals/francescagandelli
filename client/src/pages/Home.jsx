import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import { Pencil, ArrowsClockwise, Plus } from "phosphor-react";

const API = "http://localhost:5000/api";

const Home = () => {
  const isAdmin = !!localStorage.getItem("adminToken");

  const [coverFile, setCoverFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [coverLoading, setCoverLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [editingId, setEditingId] = useState(null);

  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);
  const [editingImageUrl, setEditingImageUrl] = useState(null);
  const [categorySlug, setCategorySlug] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [reorderMode, setReorderMode] = useState(false);

  const dragIndexRef = useRef(null);

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
    setEditingImageUrl(null);
    setCategorySlug("");
    setEditingId(null);
    setFormMode("create");
  };

  const openCreateForm = () => {
    resetForm();
    setFormMode("create");
    setShowForm(true);
    setEditMode(false);
    setReorderMode(false);
  };

  const openEditForm = (cat) => {
    setFormMode("edit");
    setEditingId(cat._id);
    setCategoryTitle(cat.title);
    setCategoryDescription(cat.description);
    setCategoryImage(null);
    setCategoryImagePreview(null);
    setEditingImageUrl(cat.imageUrl || null);
    setCategorySlug("");
    setShowForm(true);
    setEditMode(false);
    setReorderMode(false);
  };

  const handleCreateCategory = async () => {
    if (!categoryTitle || !categoryDescription || !categoryImage) return;

    const formData = new FormData();
    formData.append("title", categoryTitle);
    formData.append("description", categoryDescription);
    formData.append("image", categoryImage);
    if (categorySlug.trim()) formData.append("slug", categorySlug.trim());

    try {
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
        console.error("Errore creazione categoria:", data);
        alert(data.message || "Errore creazione");
        return;
      }
      setCategories((prev) => [...prev, data].sort((a, b) => a.order - b.order));
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error("Errore fetch categoria:", err);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingId || !categoryTitle || !categoryDescription) return;

    const formData = new FormData();
    formData.append("title", categoryTitle);
    formData.append("description", categoryDescription);
    if (categoryImage) formData.append("image", categoryImage);

    try {
      const res = await fetch(`${API}/categories/${editingId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token()}` },
        body: formData,
      });
      if (res.status === 401) {
        alert("Sessione scaduta, rieffettua il login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        console.error("Errore aggiornamento:", data);
        return;
      }
      setCategories((prev) =>
        prev.map((c) => (c._id === data._id ? { ...c, ...data } : c)).sort((a, b) => a.order - b.order)
      );
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error(err);
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

  const handleDragStart = (index) => {
    dragIndexRef.current = index;
  };

  const handleDragEnd = () => {
    dragIndexRef.current = null;
  };

  const handleDrop = (dropIndex) => {
    const from = dragIndexRef.current;
    dragIndexRef.current = null;
    if (from === null || from === dropIndex) return;

    const next = [...categories];
    const [removed] = next.splice(from, 1);
    next.splice(dropIndex, 0, removed);
    setCategories(next);
    persistReorder(next);
  };

  const toggleReorderMode = () => {
    setReorderMode((r) => !r);
    setEditMode(false);
    setShowForm(false);
  };

  const toggleEditMode = () => {
    setEditMode((e) => !e);
    setReorderMode(false);
    setShowForm(false);
  };

  return (
    <>
      <section className="relative w-full h-64 md:h-96 overflow-hidden">
        {isAdmin && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <label className="btn-edit-gallery">
              <Pencil size={24} className="text-white" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverChange}
              />
            </label>

            {coverFile && (
              <button type="button" onClick={handleSaveCover} className="btn-primary">
                Salva
              </button>
            )}
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

      <section className="p-8 md:mt-15 mb-16">
        <div className="flex flex-col gap-2">
          {isAdmin && (
            <div className="flex flex-wrap gap-2 justify-end items-center">
              <button
                type="button"
                className={`btn-edit-gallery ${editMode ? "ring-2 ring-white ring-offset-2 ring-offset-[var(--color-verdoscuro)]" : ""}`}
                onClick={toggleEditMode}
                title="Modifica o elimina una card (titolo, foto, testo)"
              >
                <Pencil size={22} className="text-white" />
              </button>

              <button
                type="button"
                className={`btn-edit-gallery ${reorderMode ? "ring-2 ring-white ring-offset-2 ring-offset-[var(--color-verdoscuro)]" : ""}`}
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
                <Plus size={24} className="text-white" />
              </button>
            </div>
          )}

          {isAdmin && reorderMode && (
            <p className="text-sm text-center md:text-right text-[var(--color-verdoscuro)]">
              Modalità riordino: trascina una card e rilasciala nella nuova posizione.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {showForm && (
            <div className="card flex flex-col transition-shadow duration-200 ease-in-out">
              <label className="w-full h-48 bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden">
                {categoryImagePreview ? (
                  <img
                    src={categoryImagePreview}
                    alt="Anteprima"
                    className="w-full h-full object-cover"
                  />
                ) : editingImageUrl ? (
                  <img
                    src={editingImageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 text-center text-sm px-2">
                    {formMode === "edit"
                      ? "Nessuna immagine — carica un file per aggiungerla"
                      : "Carica immagine"}
                  </span>
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

              <div className="flex-1 flex flex-col items-center justify-center bg-white p-4 text-center gap-2">
                <input
                  type="text"
                  placeholder="Titolo (es. Famiglia)"
                  value={categoryTitle}
                  onChange={(e) => setCategoryTitle(e.target.value)}
                  className="outline-none text-lg text-center w-full"
                />
                <textarea
                  placeholder="Sottotitolo / descrizione (es. Momenti in famiglia)"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="outline-none text-sm text-center w-full resize-none min-h-[4rem]"
                />

                {formMode === "create" && (
                  <input
                    type="text"
                    placeholder="Slug URL opzionale (es. matrimoni)"
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                    className="outline-none text-xs text-center w-full text-gray-600"
                  />
                )}

                <div className="flex gap-2 mt-2 w-full">
                  <button
                    type="button"
                    className="btn-primary flex-1"
                    onClick={() =>
                      formMode === "create" ? handleCreateCategory() : handleUpdateCategory()
                    }
                    disabled={
                      formMode === "create"
                        ? !categoryTitle || !categoryDescription || !categoryImage
                        : !categoryTitle || !categoryDescription
                    }
                  >
                    Salva
                  </button>

                  <button
                    type="button"
                    className="btn-secondary flex-1"
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                  >
                    Annulla
                  </button>
                </div>
              </div>
            </div>
          )}

          {categoriesLoading ? (
            <div className="col-span-full h-48 bg-gray-200 animate-pulse rounded" />
          ) : (
            categories.map((cat, index) => (
              <div
                key={cat._id}
                draggable={isAdmin && reorderMode}
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(index);
                }}
                className={reorderMode && isAdmin ? "rounded" : ""}
              >
                <Card
                  title={cat.title}
                  description={cat.description}
                  link={cat.link}
                  imageUrl={cat.imageUrl}
                  isAdmin={isAdmin}
                  editMode={editMode}
                  reorderMode={reorderMode}
                  onEdit={() => openEditForm(cat)}
                  onDelete={() => handleDeleteCategory(cat)}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
