import { List, SignOut, Wrench, InstagramLogo, Envelope, X } from "phosphor-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSiteSettings } from "../context/SiteSettingsContext.jsx";
import { lockBodyScroll, unlockBodyScroll } from "../utils/bodyScrollLock.js";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAdmin = !!localStorage.getItem("adminToken");
    const { instagramUrl, publicEmail } = useSiteSettings();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        window.location.href = "/login";
    };

    useEffect(() => {
        if (!isMenuOpen) return;
        lockBodyScroll();
        return () => unlockBodyScroll();
    }, [isMenuOpen]);

    return (
        <>
            <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-2.5 shadow sm:px-8">
                <Link to="/" className="flex min-w-0 shrink cursor-pointer items-center gap-2">
                    <h1 className="font-display text-2xl !font-extralight uppercase tracking-widest text-black">
                        FRANCESCA GANDELLI
                    </h1>
                </Link>

                {/* Desktop (lg+): voci comode in riga. Sotto lg → hamburger, così non si spezza «Chi» / «Sono» in due righe nella fascia stretta. */}
                <div className="hidden items-center gap-4 lg:flex">
                    <Link to="/" className="btn-navbar whitespace-nowrap">
                        Photography
                    </Link>
                    <Link to="/about" className="btn-navbar whitespace-nowrap">
                        Chi&nbsp;Sono
                    </Link>
                    <Link to="/contact" className="btn-navbar whitespace-nowrap">
                        Contatti
                    </Link>
                </div>

                <div className="lg:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="btn-navbar cursor-pointer px-1.5 py-1"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-nav-menu"
                        aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
                    >
                        <List size={28} color="#1E431D" />
                    </button>
                </div>

                {isAdmin && (
                    <div className="flex shrink-0 items-center gap-2">
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

            {/* Mobile: pannello da destra + overlay (sotto lg) */}
            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
                        aria-hidden
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div
                        id="mobile-nav-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu di navigazione"
                        className="fixed inset-y-0 right-0 z-[70] flex w-max max-w-[min(92vw,18rem)] flex-col bg-white py-2 pl-3 pr-1 shadow-2xl lg:hidden"
                    >
                        <div className="flex w-full justify-end pb-0.5">
                            <button
                                type="button"
                                className="rounded p-1.5 text-[var(--color-verdoscuro)] transition-colors hover:bg-black/5 hover:text-[var(--color-verdolight)]"
                                aria-label="Chiudi menu"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <X size={26} weight="bold" />
                            </button>
                        </div>
                        <div className="flex flex-1 flex-col items-end overflow-y-auto pb-4 pt-0">
                            <Link
                                to="/"
                                className="btn-navbar block w-max max-w-full py-2 text-right"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Photography
                            </Link>
                            <Link
                                to="/about"
                                className="btn-navbar block w-max max-w-full py-2 text-right"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Chi&nbsp;Sono
                            </Link>
                            <Link
                                to="/contact"
                                className="btn-navbar block w-max max-w-full py-2 text-right"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contatti
                            </Link>
                            <div className="mt-2 flex shrink-0 flex-wrap content-center items-center justify-center gap-x-1 self-stretch border-t border-gray-200 pt-3">
                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="icon-menu mx-0 inline-flex p-1"
                                    aria-label="Instagram"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <InstagramLogo size={28} />
                                </a>
                                <a
                                    href={publicEmail?.trim() ? `mailto:${publicEmail.trim()}` : "mailto:"}
                                    className="icon-menu mx-0 inline-flex p-1"
                                    aria-label="Invia email"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Envelope size={28} />
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;
