import { InstagramLogo, Envelope, PhoneCall } from "phosphor-react";
import { Link } from "react-router-dom";
import EmailContactMenu from "./EmailContactMenu";
import { useSiteSettings } from "../context/SiteSettingsContext.jsx";

const Footer = () => {
    const { instagramUrl, phoneTel } = useSiteSettings();

    return (
        <>
            <footer
                className="mt-12 w-full shrink-0 border-t border-[var(--color-verdolight)]/25 bg-[color-mix(in_srgb,var(--color-verdolight)_14%,var(--color-white))] px-6 py-8 text-center text-[var(--color-verdoscuro)] overflow-visible"
            >
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
                <div className="mx-auto my-6 h-px w-[min(92%,28rem)] rounded-full bg-[var(--color-verdolight)]/45" />
                <div className="my-3 text-[10px] font-extralight normal-case tracking-normal">
                    <Link
                        to="/privacy-policy"
                        className="mx-2 text-[var(--color-verdoscuro)] underline-offset-4 transition-colors hover:text-[var(--color-verdolight)] hover:underline"
                    >
                        Privacy Policy
                    </Link>
                    <span className="text-[var(--color-verdolight)]/55" aria-hidden>
                        |
                    </span>
                    <Link
                        to="/cookie-policy"
                        className="mx-2 text-[var(--color-verdoscuro)] underline-offset-4 transition-colors hover:text-[var(--color-verdolight)] hover:underline"
                    >
                        Cookie Policy
                    </Link>
                    <span className="text-[var(--color-verdolight)]/55" aria-hidden>
                        |
                    </span>
                    <Link
                        to="/terms-of-service"
                        className="mx-2 text-[var(--color-verdoscuro)] underline-offset-4 transition-colors hover:text-[var(--color-verdolight)] hover:underline"
                    >
                        Termini di Servizio
                    </Link>
                </div>
                <p className="text-[10px] font-extralight normal-case tracking-normal text-[var(--color-verdoscuro)]/90">
                    Tutti i testi, le immagini e i contenuti presenti su questo sito sono protetti. È vietato
                    qualunque utilizzo senza il consenso scritto dell'autore. <br />
                    © 2026 Francesca Gandelli. Tutti i diritti riservati.
                </p>
            </footer>
            {/* 0.625rem = 10px, più piccolo di text-xs (che è 0.75rem = 12px).*/}

        </>
    );
};

export default Footer;
