import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PHOTOGRAPHER_EMAIL } from "../constants/contact.js";

/** Icona busta: menu con link al modulo /contact o mailto fotografa. */
const EmailContactMenu = ({
  Icon,
  iconSize = 30,
  className = "icon-menu",
  placement = "nav",
  onNavigate,
}) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const menuClass =
    placement === "footer"
      ? "absolute bottom-full left-1/2 z-[60] mb-2 min-w-[220px] -translate-x-1/2 rounded border border-gray-200 bg-white py-2 text-left shadow-lg"
      : "absolute top-full right-0 z-[60] mt-2 min-w-[220px] rounded border border-gray-200 bg-white py-2 text-left shadow-lg";

  return (
    <div ref={wrapRef} className="relative inline-block align-middle">
      <button
        type="button"
        className={className}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Contatti: modulo o email"
        onClick={() => setOpen((o) => !o)}
      >
        <Icon size={iconSize} />
      </button>
      {open && (
        <div className={menuClass} role="menu">
          <Link
            to="/contact"
            role="menuitem"
            className="block px-4 py-2.5 text-sm font-extralight text-black normal-case tracking-normal hover:bg-[var(--color-beige-light)]"
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            Vai al modulo contatti
          </Link>
          <a
            href={`mailto:${PHOTOGRAPHER_EMAIL}`}
            role="menuitem"
            className="block px-4 py-2.5 text-sm font-extralight text-black normal-case tracking-normal hover:bg-[var(--color-beige-light)]"
            onClick={() => setOpen(false)}
          >
            Apri email ({PHOTOGRAPHER_EMAIL})
          </a>
        </div>
      )}
    </div>
  );
};

export default EmailContactMenu;
