import { Routes, Route, Link } from "react-router-dom";

// Pagine
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Family from "./pages/Family";
import Portrait from "./pages/Portrait";
import PersonalBranding from "./pages/PersonalBranding";
import Storytelling from "./pages/Storytelling";
import CategoryGallery from "./pages/CategoryGallery";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsOfService from "./pages/TermsOfService";


const App = () => {

  return (

    <main className="flex flex-col min-h-screen font-sans text-[var(--color-black)] bg-[var(--color-white)]">

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
        <Route path="/gallery/:slug" element={<CategoryGallery />} />

        <Route path="/login" element={<Login />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />


      </Routes>

      <Footer />

    </main>
  );
};

export default App;
