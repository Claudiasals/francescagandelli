import { InstagramLogo, Envelope } from "phosphor-react";
import { Link } from "react-router-dom";


const Footer = () => {

    return (
        <>
            <footer className="mt-auto p-6 text-center">
                <div>
                    <a href="https://www.instagram.com/francescagandelli_ph?igsh=bWZ6anl2bTdtcXc1"
                        target="_blank" //apre il link in una nuova scheda
                        rel="noopener noreferrer" //noopener impedisce al sito esterno di accedere alla finestra del tuo sito, evita possibili attacchi
                        className="mx-2 inline-block hover:scale-150 active:scale-95  transition-transform duration-200">
                        <InstagramLogo size={30} />
                    </a>
                    <a href="mailto:francescagandelli.photographer@gmail.com"
                        className="mx-2 inline-block hover:scale-150 active:scale-95  transition-transform duration-200">
                        <Envelope size={30} />
                    </a>
                </div>
                <div className="w-19/20 h-px bg-black my-6 mx-auto rounded-full"></div>
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

        </>
    );
};

export default Footer;
