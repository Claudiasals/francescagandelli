import { InstagramLogo, Envelope, PhoneCall } from "phosphor-react";
import { Link } from "react-router-dom";
import EmailContactMenu from "./EmailContactMenu";
import { useSiteSettings } from "../context/SiteSettingsContext.jsx";

const Footer = () => {
    const { instagramUrl, phoneTel } = useSiteSettings();

    return (
        <>
            <footer className="mt-auto p-6 text-center overflow-visible">
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                    <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-menu"
                        aria-label="Instagram"
                    >
                        <InstagramLogo size={30} />
                    </a>
                    <EmailContactMenu Icon={Envelope} iconSize={30} />
                    <a href={`tel:${phoneTel}`} className="icon-menu" aria-label="Telefono">
                        <PhoneCall size={30} />
                    </a>
                </div>
                <div className="w-19/20 h-px bg-black my-6 mx-auto rounded-full"></div>
                <div className="text-[10px] my-3">
                    <Link to="/privacy-policy" className="hover:underline mx-2">Privacy Policy</Link> |
                    <Link to="/cookie-policy" className="hover:underline mx-2">Cookie Policy</Link> |
                    <Link to="/terms-of-service" className="hover:underline mx-2">Termini di Servizio</Link>
                </div>
                <p className="text-[10px] normal-case">Tutti i testi, le immagini e i contenuti presenti su questo sito sono protetti.
                    È vietato qualunque utilizzo senza il consenso scritto dell'autore. <br />
                    © 2026 Francesca Gandelli. Tutti i diritti riservati.</p>
            </footer>
            {/* 0.625rem = 10px, più piccolo di text-xs (che è 0.75rem = 12px).*/}

        </>
    );
};

export default Footer;
