import LegalPages from "../models/legalPagesModel.js";

export const DEFAULT_PRIVACY_TEXT = `La protezione dei tuoi dati personali è importante. I dati raccolti tramite il modulo di contatto (nome, email, messaggio) saranno utilizzati esclusivamente per rispondere alle tue richieste e per fornire informazioni sui nostri servizi fotografici.

Non cederemo mai i tuoi dati a terzi senza il tuo consenso. I dati saranno conservati solo per il tempo necessario a gestire la tua richiesta o fino a un anno dall'invio.

Hai il diritto di richiedere in qualsiasi momento l'accesso, la rettifica o la cancellazione dei tuoi dati scrivendo a {{email}}.

Data aggiornamento: 27 gennaio 2026`;

export const DEFAULT_COOKIE_TEXT = `Questo sito utilizza cookie tecnici e analitici per migliorare l'esperienza di navigazione. I cookie tecnici permettono il corretto funzionamento del sito, mentre i cookie analitici consentono di raccogliere statistiche anonime sul traffico.

Non vengono condivisi dati personali con terzi senza il tuo consenso. Puoi gestire o disabilitare i cookie direttamente dalle impostazioni del tuo browser.

Data aggiornamento: 27 gennaio 2026`;

export const DEFAULT_TERMS_TEXT = `Tutti i contenuti presenti su questo sito, incluse immagini e testi, sono di proprietà di Francesca Gandelli e protetti da copyright. È vietata la riproduzione senza autorizzazione scritta.

L'utente si impegna a utilizzare il sito in modo corretto e conforme alla legge. Francesca Gandelli non si assume alcuna responsabilità per eventuali danni derivanti dall'uso delle informazioni presenti sul sito.

Eventuali prenotazioni o richieste di servizi fotografici tramite il sito saranno gestite contattando direttamente Francesca Gandelli attraverso i canali indicati.

Data aggiornamento: 27 gennaio 2026`;

const pick = (stored, fallback) => {
  const t = stored?.trim();
  return t ? t : fallback;
};

export const getLegalPagesController = async (req, res) => {
  try {
    const doc = await LegalPages.findOne();
    res.status(200).json({
      privacyText: pick(doc?.privacyText, DEFAULT_PRIVACY_TEXT),
      cookieText: pick(doc?.cookieText, DEFAULT_COOKIE_TEXT),
      termsText: pick(doc?.termsText, DEFAULT_TERMS_TEXT),
    });
  } catch (error) {
    console.error("Errore get legal pages:", error);
    res.status(500).json({ message: "Errore server" });
  }
};

export const updateLegalPagesTextController = async (req, res) => {
  try {
    const { privacyText, cookieText, termsText } = req.body;
    const fields = { privacyText, cookieText, termsText };
    const hasAny = Object.values(fields).some((v) => typeof v === "string");
    if (!hasAny) {
      return res.status(400).json({
        message: "Invia almeno uno tra privacyText, cookieText, termsText (stringhe)",
      });
    }

    let doc = await LegalPages.findOne();
    if (!doc) {
      doc = new LegalPages({});
    }
    if (typeof privacyText === "string") doc.privacyText = privacyText;
    if (typeof cookieText === "string") doc.cookieText = cookieText;
    if (typeof termsText === "string") doc.termsText = termsText;
    await doc.save();

    res.status(200).json({
      message: "Testi legali aggiornati",
      privacyText: pick(doc.privacyText, DEFAULT_PRIVACY_TEXT),
      cookieText: pick(doc.cookieText, DEFAULT_COOKIE_TEXT),
      termsText: pick(doc.termsText, DEFAULT_TERMS_TEXT),
    });
  } catch (error) {
    console.error("Errore update legal pages:", error);
    res.status(500).json({ message: "Errore server" });
  }
};
