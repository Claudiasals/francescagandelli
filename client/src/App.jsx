import { Routes, Route, Link } from "react-router-dom";

// Pagine
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GalleryPage from "./pages/GalleryPage";
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
        <Route path="/family" element={<GalleryPage />} />
        <Route path="/portrait" element={<GalleryPage />} />
        <Route path="/personal-branding" element={<GalleryPage />} />
        <Route path="/storytelling" element={<GalleryPage />} />
        <Route path="/gallery/:slug" element={<GalleryPage />} />

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
