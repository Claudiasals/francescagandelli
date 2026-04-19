import { List, SignOut, Wrench, InstagramLogo, Envelope, PhoneCall } from "phosphor-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSiteSettings } from "../context/SiteSettingsContext.jsx";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAdmin = !!localStorage.getItem("adminToken");
    const { instagramUrl, phoneTel, publicEmail } = useSiteSettings();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        window.location.href = "/login";
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white flex justify-between items-center py-1 px-6 shadow">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <h1 className="font-display font-extralight text-2xl tracking-widest uppercase text-verdoscuro">
                        FRANCESCA GANDELLI
                    </h1>
                </Link>

                {/* Desktop: solo voci testuali — i contatti sono in /contact e nel footer */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/" className="btn-navbar">Photography</Link>
                    <Link to="/about" className="btn-navbar">Chi Sono</Link>
                    <Link to="/contact" className="btn-navbar">Contatti</Link>
                </div>

                <div className="md:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="btn-navbar cursor-pointer"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-nav-menu"
                        aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
                    >
                        <List size={32} color="#1E431D" />
                    </button>
                </div>

                {isAdmin && (
                    <div className="flex items-center gap-2 shrink-0">
                        <Link
                            to="/settings"
                            className="btn-edit-gallery"
                            title="Impostazioni"
                            aria-label="Impostazioni"
                        >
                            <Wrench size={20} weight="duotone" className="text-white" />
                        </Link>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="underline underline-offset-4 cursor-pointer text-[var(--color-verdoscuro)] flex items-center justify-center hover:text-[var(--color-verdolight)] transition-colors duration-150 w-auto"
                            aria-label="Esci"
                        >
                            <SignOut size={26} />
                        </button>
                    </div>
                )}
            </nav>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile: voci + icone contatti (come footer), busta → mailto con email dalle impostazioni */}
            {isMenuOpen && (
                <div
                    id="mobile-nav-menu"
                    className="md:hidden fixed left-0 right-0 overflow-visible bg-white shadow-md z-40"
                    style={{ top: "calc(3.5rem)" }}
                >
                    <div className="flex flex-col items-center space-y-2 overflow-visible py-2 pb-4">
                        <Link to="/" className="btn-navbar" onClick={() => setIsMenuOpen(false)}>Photography</Link>
                        <Link to="/about" className="btn-navbar" onClick={() => setIsMenuOpen(false)}>Chi Sono</Link>
                        <Link to="/contact" className="btn-navbar" onClick={() => setIsMenuOpen(false)}>Contatti</Link>
                        <div className="flex w-full max-w-xs flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-black/10 pt-4 mt-1">
                            <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="icon-menu"
                                aria-label="Instagram"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <InstagramLogo size={30} />
                            </a>
                            <a
                                href={publicEmail?.trim() ? `mailto:${publicEmail.trim()}` : "mailto:"}
                                className="icon-menu"
                                aria-label="Invia email"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Envelope size={30} />
                            </a>
                            <a
                                href={`tel:${phoneTel}`}
                                className="icon-menu"
                                aria-label="Telefono"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <PhoneCall size={30} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
