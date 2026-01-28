import { Routes, Route, Link } from "react-router-dom";
import { InstagramLogo, Envelope } from "phosphor-react";

// Pagine
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Family from "./pages/Family";
import Portrait from "./pages/Portrait";
import PersonalBranding from "./pages/PersonalBranding";
import Storytelling from "./pages/Storytelling";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsOfService from "./pages/TermsOfService";


const App = () => {

  return (

    <main className="flex flex-col min-h-screen font-sans text-[var(--color-black)] bg-[var(--color-white)]">

      {/* NAVBAR */}
      <Navbar/>

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

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />


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
