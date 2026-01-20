import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "./assets/images/logo.png";
import { List } from "phosphor-react";

// Pagine
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Family from "./pages/Family";
import Portrait from "./pages/Portrait";
import PersonalBranding from "./pages/PersonalBranding";
import Storytelling from "./pages/Storytelling";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard"; 

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="flex flex-col min-h-screen font-sans text-[var(--color-black)] bg-[var(--color-white)]">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white flex justify-between items-center py-2 px-6 shadow">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-48 h-auto cursor-pointer" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-4">
          <Link to="/" className="btn-navbar">Home</Link>
          <Link to="/family" className="btn-navbar">Gallery</Link>
          <Link to="/about" className="btn-navbar">Chi Sono</Link>
          <Link to="/contact" className="btn-navbar">Contatti</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn-navbar"
          >
            <List size={32} color="#8CA576" weight="bold" />

          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed left-0 right-0 bg-white shadow-md z-40"
             style={{ top: "calc(3.5rem)" /* altezza navbar */ }}>
          <div className="flex flex-col items-center space-y-2 py-2">
            <Link to="/" className="btn-navbar" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/family" className="btn-navbar" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
            <Link to="/about" className="btn-navbar" onClick={() => setIsMenuOpen(false)}>Chi Sono</Link>
            <Link to="/contact" className="btn-navbar" onClick={() => setIsMenuOpen(false)}>Contatti</Link>
          </div>
        </div>
      )}

      {/* CONTENUTO DINAMICO */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/family" element={<Family />} />
        <Route path="/portrait" element={<Portrait />} />
        <Route path="/personal-branding" element={<PersonalBranding />} />
        <Route path="/storytelling" element={<Storytelling />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />


      </Routes>

      {/* FOOTER */}
      <footer className="mt-auto p-6 text-center text-[0.625rem] text-white bg-[var(--color-verdolight)]">
        Tutti i testi, le immagini e i contenuti presenti su questo sito sono protetti.<br />
        È vietato qualunque utilizzo senza il consenso scritto dell'autore. <br />
        © 2026 Francesca Gandelli. Tutti i diritti riservati.
      </footer>
      {/* 0.625rem = 10px, più piccolo di text-xs (che è 0.75rem = 12px).*/}

    </main>
  );
};

export default App;
