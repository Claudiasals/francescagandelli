import logo from "../assets/images/logo-francesca-gandelli5.png";
import logo2 from "../assets/images/logo-francesca-gandelli6.png";

import { List, InstagramLogo, EnvelopeOpen, PhoneCall } from "phosphor-react";
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
                    <img src={logo} alt="Logo" className="w-30 h-auto cursor-pointer" />
                    <img src={logo2} alt="Logo2" className="w-58 h-auto cursor-pointer" />
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

                {isAdmin && <button onClick={handleLogout} className="btn-primary">Logout</button>}
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
        </>
    );
};

export default Navbar;
