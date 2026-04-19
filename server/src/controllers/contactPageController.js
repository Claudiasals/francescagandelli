import ContactPage from "../models/contactPageModel.js";

export const DEFAULT_CONTACT_INTRO = `Se desideri prenotare una sessione fotografica o
discutere di un progetto, non esitare a contattarmi!
Sarò felice di rispondere a tutte le tue domande e
aiutarti a catturare i tuoi momenti speciali.`;

export const DEFAULT_CONTACT_FORM_LEAD = "Compila il form, ti risponderò il prima possibile!";

export const getContactPageController = async (req, res) => {
  try {
    const doc = await ContactPage.findOne();
    if (!doc) {
      return res.status(200).json({
        introText: DEFAULT_CONTACT_INTRO,
        formLeadText: DEFAULT_CONTACT_FORM_LEAD,
      });
    }
    res.status(200).json({
      introText:
        doc.introText?.trim() ? doc.introText.trim() : DEFAULT_CONTACT_INTRO,
      formLeadText:
        doc.formLeadText?.trim() ? doc.formLeadText.trim() : DEFAULT_CONTACT_FORM_LEAD,
    });
  } catch (error) {
    console.error("Errore get contact page:", error);
    res.status(500).json({ message: "Errore server" });
  }
};

export const updateContactPageTextController = async (req, res) => {
  try {
    const { introText, formLeadText } = req.body;
    if (typeof introText !== "string" || typeof formLeadText !== "string") {
      return res.status(400).json({ message: "Campi introText e formLeadText (stringhe) richiesti" });
    }

    let doc = await ContactPage.findOne();
    if (!doc) {
      doc = new ContactPage({ introText, formLeadText });
    } else {
      doc.introText = introText;
      doc.formLeadText = formLeadText;
    }
    await doc.save();
    res.status(200).json({
      message: "Contenuti aggiornati",
      introText: doc.introText,
      formLeadText: doc.formLeadText,
    });
  } catch (error) {
    console.error("Errore update contact page:", error);
    res.status(500).json({ message: "Errore server" });
  }
};
