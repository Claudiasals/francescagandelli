import { useState } from "react";
import cover from "./assets/images/cover.png";
import image1 from "./assets/images/image1.jpg";
import image2 from "./assets/images/image2.jpg";
import image3 from "./assets/images/image3.jpg";

const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Messaggio inviato:\nNome: ${formData.name}\nEmail: ${formData.email}`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="font-sans text-[var(--color-black)] bg-[var(--color-white)] min-h-screen">

      {/* Navbar */}
      <nav className="flex justify-between items-center py-1 px-6  ">
        <div className="text-2xl font-bold">LOGO</div>
        <div className="flex gap-4">
          <button className="btn-navbar">Home</button>
          <button className="btn-navbar">Gallery</button>
          <button className="btn-navbar">Chi Sono</button>
          <button className="btn-navbar">Contatti</button>
        </div>
      </nav>

      {/* Copertina */}
      <section className="h-80 md:h-96">
        <img src={cover} alt="Copertina" className="w-full h-full object-cover" />
      </section>

      {/* Portfolio */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Portfolio</h2>

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <img src={image1} alt="Ritratto 1" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-1 bg-white">
                <h3 className="card-title">Ritratti</h3>
                <p className="card-desc">Una raccolta di ritratti emozionanti e artistici.</p>
              </div>
            </div>
            <div className="card">
              <img src={image2} alt="Ritratto 2" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-1 bg-white">
                <h3 className="card-title">Ritratti</h3>
                <p className="card-desc">Scatti intimi e professionali.</p>
              </div>
            </div>
            <div className="card">
              <img src={image3} alt="Ritratto 3" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-1 bg-white">
                <h3 className="card-title">Ritratti</h3>
                <p className="card-desc">Momenti catturati con eleganza.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-white bg-[var(--color-verdolight)]">
        © 2026 Tutti i diritti riservati
      </footer>

    </main>
  );
};

export default App;
