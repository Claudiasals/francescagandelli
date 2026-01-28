import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "./assets/images/logo.png";
import { List, InstagramLogo, Envelope, EnvelopeOpen, PhoneCall } from "phosphor-react";

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
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsOfService from "./pages/TermsOfService";
import FamilyDashboard from "./pages/FamilyDashboard";
import PortraitDashboard from "./pages/PortraitDashboard";
import PersonalBrandingDashboard from "./pages/PBrandingDashboard";
import StorytellingDashboard from "./pages/STDashboard";


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
            <div className="flex flex-row">
              <a href="https://www.instagram.com/francescagandelli_ph?igsh=bWZ6anl2bTdtcXc1"
                target="_blank" //apre il link in una nuova scheda
                rel="noopener noreferrer" //noopener impedisce al sito esterno di accedere alla finestra del tuo sito, evita possibili attacchi
                className="icon-menu">
                <InstagramLogo size={40} weight="duotone" />
              </a>

              <a href="mailto:francescagandelli.photographer@gmail.com"
                className="icon-menu">
                <EnvelopeOpen size={40} weight="duotone" />
              </a>
              <a
                href="tel:+393466106008"
                className="icon-menu">
                <PhoneCall size={40} weight="duotone" />
              </a>
            </div>
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/family-dashboard" element={<FamilyDashboard />} />
        <Route path="/portrait-dashboard" element={<PortraitDashboard />} />
        <Route path="/personal-branding-dashboard" element={<PersonalBrandingDashboard />} />
        <Route path="/storytelling-dashboard" element={<StorytellingDashboard />} />

      </Routes>

      {/* FOOTER */}
      <footer className="mt-auto p-6 text-center text-white bg-[var(--color-verdolight)]">
        <div>
          <a href="https://www.instagram.com/francescagandelli_ph?igsh=bWZ6anl2bTdtcXc1"
            target="_blank" //apre il link in una nuova scheda
            rel="noopener noreferrer" //noopener impedisce al sito esterno di accedere alla finestra del tuo sito, evita possibili attacchi
            className="mx-2 inline-block hover:scale-150 active:scale-95  transition-transform duration-200">
            <InstagramLogo size={40} weight="duotone" />
          </a>
          <a href="mailto:francescagandelli.photographer@gmail.com"
            className="mx-2 inline-block hover:scale-150 active:scale-95  transition-transform duration-200">
            <Envelope size={40} weight="duotone" />
          </a>
        </div>
        <div className="w-19/20 h-px bg-white my-6 mx-auto rounded-full"></div>
        <div className="text-xs my-3">
          <Link to="/privacy-policy" className="hover:underline mx-2">Privacy Policy</Link> |
          <Link to="/cookie-policy" className="hover:underline mx-2">Cookie Policy</Link> |
          <Link to="/terms-of-service" className="hover:underline mx-2">Termini di Servizio</Link>
        </div>
        <p className="text-xs">Tutti i testi, le immagini e i contenuti presenti su questo sito sono protetti.
          È vietato qualunque utilizzo senza il consenso scritto dell'autore.
          © 2026 Francesca Gandelli. Tutti i diritti riservati.</p>
      </footer>
      {/* 0.625rem = 10px, più piccolo di text-xs (che è 0.75rem = 12px).*/}

    </main>
  );
};

export default App;
