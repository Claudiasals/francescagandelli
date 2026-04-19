import { Link } from "react-router-dom";

/** Icona busta: un clic porta alla pagina Contatti con il modulo (invio email via server). */
const EmailContactMenu = ({
  Icon,
  iconSize = 30,
  className = "icon-menu",
  onNavigate,
}) => (
  <Link
    to="/contact#contact-form"
    className={className}
    aria-label="Vai al modulo contatti"
    onClick={() => onNavigate?.()}
  >
    <Icon size={iconSize} />
  </Link>
);

export default EmailContactMenu;
