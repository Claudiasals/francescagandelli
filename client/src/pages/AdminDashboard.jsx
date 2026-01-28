import { useState } from "react";
import Card from "../components/Card";
import { Pencil, Trash, ArrowsClockwise, Plus, Check } from "phosphor-react";
import { useEffect } from "react";


const AdminDashboard = () => {

  const token = localStorage.getItem("adminToken");

  if (!token) {
    // Se non c’è token, rimanda al login
    window.location.href = "/login";
    return null; // evita di renderizzare la dashboard
  }

  const [coverFile, setCoverFile] = useState(null);  // file scelto dall'utente
  const [preview, setPreview] = useState(null);   // anteprima immagine
  const [coverUrl, setCoverUrl] = useState(null); // URL vero dal DB
  const [isSaved, setIsSaved] = useState(false); // false = "Salva", true = "Salvato"
  const [loading, setLoading] = useState(true);
  
  // carica la copertina esistente dal DB al montaggio del componente
  useEffect(() => {
    const fetchCover = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch("http://localhost:5000/api/cover", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.coverUrl) setCoverUrl(data.coverUrl);
      } catch (err) {
        console.error("Errore fetch copertina:", err);
      } finally {
        setLoading(false); // solo quando finisce il fetch
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
      });


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
      
        setCoverUrl(data.coverUrl  + "?t=" + Date.now()); // aggiorna la copertina
        setPreview(null);
        setCoverFile(null);
        setIsSaved(true); // cambia bottone a "Salvato"
    
    } catch (err) {
      console.error("Errore upload:", err);
    }
  };


  const categories = [
    { id: 1, title: "Famiglia", description: "Momenti in famiglia", link: "/family" },
    { id: 2, title: "Ritratti", description: "Scatti professionali", link: "/portrait" },
    { id: 3, title: "Storytelling", description: "Racconti fotografici", link: "/storytelling" },
    { id: 4, title: "Personal Branding", description: "Immagini per il tuo brand", link: "/personal-branding" },
  ];


  return (
    <>
      <section className=" md:h-96 ">

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


        {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        ) : (
          <img src={preview || coverUrl} alt="Copertina" className="w-full h-full object-cover" />
        )}


        {/* coverUrl = verità dal backend
    preview = solo anteprima temporanea
    cover.png = solo fallback */}

      </section>

      <section className="p-8 mt-1 md:mt-15">

        <div className=" flex gap-2 p-2 justify-between">
          <h2 className=" text-3xl font-bold mb-6">Portfolio</h2>
          <div className="flex gap-2 p-2 justify-end">
            <button
              type="button"
              className="btn-edit-gallery"
            >
              <Pencil
                size={24}
                className="text-white"
              />
            </button>
            <button type="button"
              className="btn-edit-gallery" >
              <ArrowsClockwise size={24} className="text-white" />
            </button>
            <button type="button"
              className="btn-edit-gallery" >
              <Plus size={24} className="text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
          {categories.map(cat => (
            <Card key={cat.id} {...cat} />
          ))}
        </div>
      </section>

      <div className=" flex gap-2 p-2 justify-end m-2">
        <button
          type="button"
          className="btn-primary"
          onClick={handleSaveCover}
        >
          <span className="text-white font-semibold">
            {isSaved ? "Salvato" : "Salva"}
          </span>
          <Check
            size={24}
            className="text-white"
            weight="bold"
          />
        </button>
      </div>


    </>
  );
};


export default AdminDashboard;