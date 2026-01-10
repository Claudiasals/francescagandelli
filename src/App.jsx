import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "./assets/images/logo.png";

// import delle pagine
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Family from "./pages/Family";
import Portrait from "./pages/Portrait";
import PersonalBranding from "./pages/PersonalBranding";
import Storytelling from "./pages/Storytelling";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="font-sans text-[var(--color-black)] bg-[var(--color-white)] min-h-screen">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center py-1 px-6">
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
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4">
          <Link to="/" className="btn-navbar">Home</Link>
          <Link to="/family" className="btn-navbar">Gallery</Link>
          <Link to="/about" className="btn-navbar">Chi Sono</Link>
          <Link to="/contact" className="btn-navbar">Contatti</Link>
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
      </Routes>

      {/* FOOTER */}
      <footer className="p-6 text-center text-sm text-white bg-[var(--color-verdolight)]">
        © 2026 Tutti i diritti riservati
      </footer>

    </main>
  );
};

export default App;
