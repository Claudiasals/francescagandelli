import { List, InstagramLogo, EnvelopeOpen, PhoneCall, SignOut } from "phosphor-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAdmin = !!localStorage.getItem("adminToken");

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        window.location.href = "/login";
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-white flex justify-between items-center py-1 px-6 shadow">
                <Link to="/" className="flex items-center gap-2">
                    <h1 className="font-display font-extralight text-2xl tracking-widest uppercase text-verdoscuro">
                        FRANCESCA GANDELLI
                    </h1>                </Link>

                {/* Desktop */}
                <div className="hidden md:flex gap-4">
                    <Link to="/" className="btn-navbar">Photography</Link>
                    <Link to="/about" className="btn-navbar">Chi Sono</Link>
                    <Link to="/contact" className="btn-navbar">Contatti</Link>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="btn-navbar"
                    >
                        <List size={32} color="#1E431D"  />

                    </button>
                </div>

                {isAdmin && <button onClick={handleLogout} className="underline underline-offset-4 
                   text-[var(--color-verdoscuro)] 
                   flex items-center justify-center
                   hover:text-[var(--color-verdolight)]
                   transition-colors transform transition-transform duration-150 
                   active:scale-70 hover:scale-120 w-auto"><SignOut size={26} /></button>}
            </nav>


            {/* OVERLAY cliccabile */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden fixed left-0 right-0 bg-white shadow-md z-40"
                    style={{ top: "calc(3.5rem)" /* altezza navbar */ }}>
                    <div className="flex flex-col items-center space-y-2 py-2">
                        <Link to="/" className="btn-navbar" onClick={() => setIsMenuOpen(false)}>Photografy</Link>
                        <Link to="/about" className="btn-navbar" onClick={() => setIsMenuOpen(false)}>Chi Sono</Link>
                        <Link to="/contact" className="btn-navbar" onClick={() => setIsMenuOpen(false)}>Contatti</Link>
                        <div className="flex flex-row">
                            <a href="https://www.instagram.com/francescagandelli_ph?igsh=bWZ6anl2bTdtcXc1"
                                target="_blank" //apre il link in una nuova scheda
                                rel="noopener noreferrer" //noopener impedisce al sito esterno di accedere alla finestra del tuo sito, evita possibili attacchi
                                className="icon-menu">
                                <InstagramLogo size={30} />
                            </a>

                            <a href="mailto:francescagandelli.photographer@gmail.com"
                                className="icon-menu">
                                <EnvelopeOpen size={30} />
                            </a>
                            <a
                                href="tel:+393466106008"
                                className="icon-menu">
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
