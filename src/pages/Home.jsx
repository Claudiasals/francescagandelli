import Card from "../components/Card";
import cover from "../assets/images/cover.png";


const Home = () => {
  const categories = [
    { id: 1, title: "Famiglia", description: "Momenti in famiglia", link: "/family" },
    { id: 2, title: "Ritratti", description: "Scatti professionali", link: "/portraits" },
    { id: 3, title: "Storytelling", description: "Racconti fotografici", link: "/storytelling" },
    { id: 4, title: "Personal Branding", description: "Immagini per il tuo brand", link: "/personal-branding" },
  ];

  return (
    <>
      <section className="h-80 md:h-96">
        <img src={cover} alt="Copertina" className="w-full h-full object-cover" />
      </section>

      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Portfolio</h2>
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
