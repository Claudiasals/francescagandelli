import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSiteSettings } from "../context/SiteSettingsContext.jsx";

const API = "http://localhost:5000/api";

/** Solo cifre nazionali (10), da phoneTel o phoneDisplay salvati. */
function national10FromStored(phoneTel, phoneDisplay) {
  const raw = String(phoneTel || phoneDisplay || "")
    .replace(/\s/g, "")
    .trim();
  if (!raw) return "";
  let d = raw.replace(/^\+/, "").replace(/\D/g, "");
  if (d.startsWith("39")) d = d.slice(2);
  return d.slice(0, 10);
}

function buildPhoneTel(national10) {
  const d = national10.replace(/\D/g, "");
  return d.length === 10 ? `+39${d}` : "";
}

/** Es. 3466106008 → +39 346 610 6008 */
function buildPhoneDisplay(national10) {
  const d = national10.replace(/\D/g, "").slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return `+39 ${d}`;
  if (d.length <= 6) return `+39 ${d.slice(0, 3)} ${d.slice(3)}`;
  return `+39 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 10)}`;
}

const Settings = () => {
  const navigate = useNavigate();
  const token = () => localStorage.getItem("adminToken");
  const { publicEmail, instagramUrl, phoneTel, phoneDisplay, refresh } = useSiteSettings();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdMessage, setPwdMessage] = useState("");

  const [email, setEmail] = useState("");
  const [ig, setIg] = useState("");
  /** Solo le 10 cifre dopo +39 (senza spazi). */
  const [phoneNational10, setPhoneNational10] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  useEffect(() => {
    if (!token()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    setEmail(publicEmail);
    setIg(instagramUrl);
    setPhoneNational10(national10FromStored(phoneTel, phoneDisplay));
  }, [publicEmail, instagramUrl, phoneTel, phoneDisplay]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdMessage("");
    if (newPassword !== confirmPassword) {
      setPwdMessage("Le nuove password non coincidono.");
      return;
    }
    try {
      const res = await fetch(`${API}/auth/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        setPwdMessage(data.message || "Sessione scaduta o password attuale errata");
        return;
      }
      if (!res.ok) {
        setPwdMessage(data.message || "Errore");
        return;
      }
      setPwdMessage("Password aggiornata.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setPwdMessage("Errore di rete.");
    }
  };

  const handleSaveContact = async (e) => {
    e.preventDefault();
    setContactMessage("");
    const national = phoneNational10.replace(/\D/g, "");
    if (national.length !== 10) {
      setContactMessage("Inserisci le 10 cifre del cellulare (dopo +39).");
      return;
    }
    const computedTel = buildPhoneTel(national);
    const computedDisplay = buildPhoneDisplay(national);
    try {
      const res = await fetch(`${API}/site-settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({
          publicEmail: email.trim(),
          instagramUrl: ig.trim(),
          phoneTel: computedTel,
          phoneDisplay: computedDisplay,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        alert("Sessione scaduta");
        navigate("/login");
        return;
      }
      if (!res.ok) {
        setContactMessage(data.message || "Errore salvataggio");
        return;
      }
      setContactMessage("Impostazioni salvate.");
      await refresh();
    } catch (err) {
      console.error(err);
      setContactMessage("Errore di rete.");
    }
  };

  if (!token()) return null;

  return (
    <section className="max-w-xl mx-auto p-8 space-y-12">
      <h1 className="font-display font-extralight text-2xl tracking-widest uppercase text-verdoscuro">
        Impostazioni
      </h1>

      <form onSubmit={handleChangePassword} className="space-y-4 border-b border-gray-200 pb-10">
        <h2 className="font-display font-extralight text-lg tracking-widest uppercase text-verdoscuro">
          Password amministratore
        </h2>
        <label className="flex flex-col gap-1">
          <span className="text-sm normal-case tracking-normal">Password attuale</span>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border border-gray-300 rounded p-2"
            autoComplete="current-password"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm normal-case tracking-normal">Nuova password</span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 rounded p-2"
            autoComplete="new-password"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm normal-case tracking-normal">Ripeti nuova password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded p-2"
            autoComplete="new-password"
          />
        </label>
        {pwdMessage && <p className="text-sm text-verdoscuro">{pwdMessage}</p>}
        <button type="submit" className="btn-primary">
          Aggiorna password
        </button>
      </form>

      <form onSubmit={handleSaveContact} className="space-y-4">
        <h2 className="font-display font-extralight text-lg tracking-widest uppercase text-verdoscuro">
          Contatti sul sito
        </h2>
        <p className="text-sm font-extralight normal-case tracking-normal text-gray-700 leading-relaxed">
          Questi valori compaiono nel modulo contatti, nel footer, e definiscono dove arrivano le email inviate dal
          form.
        </p>
        <label className="flex flex-col gap-1">
          <span className="text-sm normal-case tracking-normal">Email pubblica</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm normal-case tracking-normal">Link profilo Instagram (URL completo)</span>
          <input
            type="url"
            value={ig}
            onChange={(e) => setIg(e.target.value)}
            className="border border-gray-300 rounded p-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm normal-case tracking-normal">Telefono</span>
         
          <div className="flex max-w-md items-center gap-2 rounded border border-gray-300 bg-white px-2">
            <span className="shrink-0 text-sm normal-case tracking-normal text-verdoscuro">+39</span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="tel-national"
              value={phoneNational10}
              onChange={(e) => setPhoneNational10(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="min-w-0 flex-1 border-0 py-2 text-sm normal-case tracking-normal outline-none"
              placeholder="3466106008"
              maxLength={10}
            />
          </div>
          {phoneNational10.replace(/\D/g, "").length > 0 && (
            <p className="text-xs font-extralight normal-case tracking-normal text-gray-500">
              Anteprima in pagina: {buildPhoneDisplay(phoneNational10) || "…"}
            </p>
          )}
        </label>
        {contactMessage && <p className="text-sm text-verdoscuro">{contactMessage}</p>}
        <button type="submit" className="btn-primary">
          SALVA
        </button>
      </form>

      <div className="space-y-4 border-t border-gray-200 pt-10">
        <h2 className="font-display font-extralight text-lg tracking-widest uppercase text-verdoscuro">
          Aggiorna le Pagine legali
        </h2>
      
        <ul className="list-none space-y-3 pl-0">
          <li>
            <Link
              to="/privacy-policy"
              className="text-[var(--color-verdolight)] hover:text-[var(--color-verdoscuro)] underline underline-offset-4 font-extralight tracking-wide transition-colors"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/cookie-policy"
              className="text-[var(--color-verdolight)] hover:text-[var(--color-verdoscuro)] underline underline-offset-4 font-extralight tracking-wide transition-colors"
            >
              Cookie Policy
            </Link>
          </li>
          <li>
            <Link
              to="/terms-of-service"
              className="text-[var(--color-verdolight)] hover:text-[var(--color-verdoscuro)] underline underline-offset-4 font-extralight tracking-wide transition-colors"
            >
              Termini di Servizio
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Settings;
