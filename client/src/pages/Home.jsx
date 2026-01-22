import Card from "../components/Card";
import cover from "../assets/images/cover.png";


const Home = () => {
  const categories = [
    { id: 1, title: "Famiglia", description: "Momenti in famiglia", link: "/family" },
    { id: 2, title: "Ritratti", description: "Scatti professionali", link: "/portrait" },
    { id: 3, title: "Storytelling", description: "Racconti fotografici", link: "/storytelling" },
    { id: 4, title: "Personal Branding", description: "Immagini per il tuo brand", link: "/personal-branding" },
  ];

  return (
    <>
      <section className="h-80 md:h-96">
        <img src={cover} alt="Copertina" className="w-full h-full object-cover" />
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

//# CLOUDINARY 
/* 
Cloudinary: Cos’è?
Servizio di gestione e delivery di immagini e video. Si occupa automaticamente di:
Ridimensionamento, compressione e formati moderni (WebP, AVIF).
CDN globale per servire le immagini velocemente.
Trasformazioni lato URL (es. ritaglio, filtri, effetti).

Prestazioni:
Ottimizzato per web: immagini veloci e responsive.
CDN integrato per una distribuzione rapida in tutto il mondo.
Caricamento semplice direttamente da frontend o backend.

Prezzo e piano gratuito:
Free plan: 25.000 trasformazioni al mese, 25 GB di storage, 25 GB di bandwidth.
Perfetto per un portfolio fotografico fino a 200 foto, anche ad alta risoluzione.

Pro:
Ottimizzazione immagini automatica.
CDN inclua.
Trasformazioni dinamiche via URL.
Gratis fino a 25 GB.

Contro:
Meno flessibile come gestione file rispetto a S3 (sei vincolata a come Cloudinary organizza i file).
Alcune feature avanzate sono a pagamento.
*/