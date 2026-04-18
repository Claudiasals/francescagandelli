import { PHOTOGRAPHER_EMAIL } from "../constants/contact.js";

const PrivacyPolicy = () => {
    return (
      <section className="max-w-3xl mx-auto p-8 space-y-4">
        <h1 className="text-3xl font-bold text-[var(--color-verdolight)]">Privacy Policy</h1>
  
        <p>
          La protezione dei tuoi dati personali è importante. I dati raccolti tramite il modulo di contatto
          (nome, email, messaggio) saranno utilizzati esclusivamente per rispondere alle tue richieste
          e per fornire informazioni sui nostri servizi fotografici.
        </p>
  
        <p>
          Non cederemo mai i tuoi dati a terzi senza il tuo consenso. I dati saranno conservati solo
          per il tempo necessario a gestire la tua richiesta o fino a un anno dall’invio.
        </p>
  
        <p>
          Hai il diritto di richiedere in qualsiasi momento l’accesso, la rettifica o la cancellazione
          dei tuoi dati scrivendo a{" "}
          <a href={`mailto:${PHOTOGRAPHER_EMAIL}`} className="hover:underline">
            {PHOTOGRAPHER_EMAIL}
          </a>
          .
        </p>
  
        <p>Data aggiornamento: 27 gennaio 2026</p>
      </section>
    );
  };
  
  export default PrivacyPolicy;
  