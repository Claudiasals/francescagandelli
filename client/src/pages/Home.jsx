import { useEffect, useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [coverUrl, setCoverUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCover = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cover");
        const data = await res.json();
        if (data.coverUrl) setCoverUrl(data.coverUrl);
      } catch (err) {
        console.error("Errore fetch copertina pubblica:", err);
      } finally {
        setLoading(false); // solo alla fine del fetch
      }
    };

    fetchCover();
  }, []);

  const categories = [
    { id: 1, title: "Famiglia", description: "Momenti in famiglia", link: "/family" },
    { id: 2, title: "Ritratti", description: "Scatti professionali", link: "/portrait" },
    { id: 3, title: "Storytelling", description: "Racconti fotografici", link: "/storytelling" },
    { id: 4, title: "Personal Branding", description: "Immagini per il tuo brand", link: "/personal-branding" },
  ];

  return (
    <>
      <section className="h-80 md:h-96">
      {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div> // placeholder mentre carica
        ) : (
          <img
            src={coverUrl || cover} // fallback solo se coverUrl mancante
            alt="Copertina"
            className="w-full h-full object-cover"
          />
        )}
      </section>

      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-start">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(cat => (
            <Card key={cat.id} {...cat} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
