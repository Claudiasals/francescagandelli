import { useState } from "react";
import Card from "../components/Card";
import { Pencil, Trash, ArrowsClockwise, Plus } from "phosphor-react";
import { useEffect } from "react";


const Home = () => {

  const isAdmin = !!localStorage.getItem("adminToken");

  const [coverFile, setCoverFile] = useState(null);  // file scelto dall'utente
  const [preview, setPreview] = useState(null);   // anteprima immagine
  const [coverUrl, setCoverUrl] = useState(null); // URL vero dal DB
  const [isSaved, setIsSaved] = useState(false); // false = "Salva", true = "Salvato"
  const [loading, setLoading] = useState(true);

  // funzione aggiungi categoria
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  // carica la copertina esistente dal DB al montaggio del componente
  useEffect(() => {
    const fetchCover = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cover");
        const data = await res.json();
        if (data.coverUrl) setCoverUrl(data.coverUrl);
      } catch (err) {
        console.error("Errore fetch copertina:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCover();
  }, []);

  // Funzione per gestire la scelta del file
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
    setIsSaved(false); // resetto stato a false quando scelgo nuovo file

    // Genera l'anteprima locale
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  // aggiungo onClick al pusante "salva"
  const handleSaveCover = async () => {
    if (!coverFile) return; // nessun file selezionato

    // prendo il token
    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("cover", coverFile);

    try {
      const response = await fetch("http://localhost:5000/api/cover", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      // Gestione 401 :  token mancante
      if (response.status === 401) {
        alert("Sessione scaduta, rieffettua il login");
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

      setCoverUrl(data.coverUrl + "?t=" + Date.now()); // aggiorna la copertina
      setPreview(null);
      setCoverFile(null);
      setIsSaved(true); // cambia bottone a "Salvato"

    } catch (err) {
      console.error("Errore upload:", err);
    }
  };


  const [categories, setCategories] = useState([
    { id: 1, title: "Famiglia", description: "Momenti in famiglia", imageUrl: "/path/to/image1.png", link: "/family" },
    { id: 2, title: "Ritratti", description: "Scatti professionali", imageUrl: "/path/to/image2.png", link: "/portrait" },
    { id: 3, title: "Storytelling", description: "Racconti fotografici", imageUrl: "/path/to/image3.png", link: "/storytelling" },
    { id: 4, title: "Personal Branding", description: "Immagini per il tuo brand", imageUrl: "/path/to/image4.png", link: "/personal-branding" },
  ]);

  // FUNZIONE CREA CARD CATEGORIA FOTO
  const handleCreateCategory = async () => {
    if (!categoryTitle || !categoryDescription || !categoryImage) return;

    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("title", categoryTitle);
    formData.append("description", categoryDescription);
    formData.append("image", categoryImage);

    try {
      const res = await fetch("http://localhost:5000/api/categories/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Errore creazione categoria:", data);
        return;
      }

      // Aggiorna lo state
      setCategories(prev => [...prev, data]);

      // Reset input e chiudi form
      setCategoryTitle("");
      setCategoryDescription("");
      setCategoryImage(null);
      setShowCategoryForm(false);

    } catch (err) {
      console.error("Errore fetch categoria:", err);
    }
  };

  return (
    <>
      <section className=" md:h-96 ">

        {isAdmin && (

          <div className=" flex gap-2 p-4 justify-end">

            <label //label e non button x aprire il file picker cliccando sull’icona.
              className="btn-edit-gallery"
            >
              <Pencil
                size={24}
                className="text-white"
              />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverChange}
              />
            </label>

            {/* mostra il bottone "salva" se esiste coverFile (immagine)
            Se coverFile è null, undefined, false o vuoto non mostra niente. */}
            {coverFile && (
              <button
                onClick={handleSaveCover}
                className="btn-primary"
              >
                Salva
              </button>
            )}

            {/* <button type="button"
            className="
            w-9 h-9 rounded-full 
            bg-[var(--color-verdolight)] 
            flex items-center justify-center
            hover:bg-[var(--color-verdoscuro)]
            transition-colors" >
            <Trash size={24} className="text-white" />
            </button> */}

          </div>
        )}

        {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        ) : (
          <img src={preview || coverUrl} alt="Copertina" className="w-full h-full object-cover" />
        )}


        {/* coverUrl = dal backend
        preview = solo anteprima temporanea
        cover.png = solo fallback */}

      </section>

      <section className="p-8 md:mt-15 mb-16">

        <div className=" flex gap-2 justify-between">

          {isAdmin && (
            <div className="flex gap-2 p-2 justify-end">

              <button
                type="button"
                className="btn-edit-gallery"
                onClick={() => setShowCategoryForm(true)}
              >
                <Pencil
                  size={22}
                  className="text-white"
                />
              </button>

              <button type="button"
                className="btn-edit-gallery" >
                <ArrowsClockwise size={22} className="text-white" />
              </button>

              <button type="button"
                className="btn-edit-gallery"
                onClick={() => setShowCategoryForm(true)}
              >
                <Plus size={24} className="text-white" />
              </button>

            </div>
          )}

        </div>



        {/* GRIGLIA FORM ADD CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

          {showCategoryForm && (
            <div
              className={`
      card cursor-pointer
      transform transition-transform duration-200 ease-in-out
      hover:scale-105 scale-100
      flex flex-col
    `}
            >
              {/* Immagine / placeholder */}
              <label className="w-full h-48 bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden">
                {categoryImage ? (
                  <img
                    src={URL.createObjectURL(categoryImage)}
                    alt="Anteprima"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 text-center text-sm">Carica immagine</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setCategoryImage(e.target.files[0])}
                />
              </label>

              {/* Contenuto centrato */}
              <div className="flex-1 flex flex-col items-center justify-center bg-white p-4 text-center gap-2">
                <input
                  type="text"
                  placeholder="Titolo"
                  value={categoryTitle}
                  onChange={(e) => setCategoryTitle(e.target.value)}
                  className="outline-none text-lg text-center w-full"
                />
                <textarea
                  placeholder="Descrizione"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="outline-none text-sm text-center w-full resize-none"
                />

                <div className="flex gap-2 mt-2 w-full">
                  <button
                    type="button"
                    className="btn-primary flex-1"
                    onClick={(e) => {
                      e.stopPropagation(); // importante se sei dentro una card cliccabile
                      handleCreateCategory();
                    }}
                  >
                    Salva
                  </button>

                  <button
                    type="button"
                    className="btn-secondary flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCategoryForm(false);
                    }}
                  >
                    Annulla
                  </button>
                </div>
              </div>
            </div>
          )}

          {categories.map(cat => (
            <Card key={cat.id} {...cat} />
          ))}
        </div>

      </section>



    </>
  );
};


export default Home;