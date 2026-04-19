import SiteSettings from "../models/siteSettingsModel.js";

export const DEFAULT_PUBLIC_EMAIL = "francescagandelli.ph@gmail.com";
export const DEFAULT_INSTAGRAM_URL =
  "https://www.instagram.com/francescagandelli_ph?igsh=bWZ6anl2bTdtcXc1";
export const DEFAULT_PHONE_TEL = "+393466106008";
export const DEFAULT_PHONE_DISPLAY = "+39 346 610 6008";

const normalizeTel = (s) => {
  if (typeof s !== "string") return "";
  const t = s.trim().replace(/\s/g, "");
  if (!t) return "";
  return t.startsWith("+") ? t : `+${t.replace(/^\+/, "")}`;
};

export const getSiteSettingsController = async (req, res) => {
  try {
    let doc = await SiteSettings.findOne();
    if (!doc) {
      return res.status(200).json({
        publicEmail: DEFAULT_PUBLIC_EMAIL,
        instagramUrl: DEFAULT_INSTAGRAM_URL,
        phoneTel: DEFAULT_PHONE_TEL,
        phoneDisplay: DEFAULT_PHONE_DISPLAY,
      });
    }
    res.status(200).json({
      publicEmail: doc.publicEmail?.trim() || DEFAULT_PUBLIC_EMAIL,
      instagramUrl: doc.instagramUrl?.trim() || DEFAULT_INSTAGRAM_URL,
      phoneTel: normalizeTel(doc.phoneTel) || DEFAULT_PHONE_TEL,
      phoneDisplay: doc.phoneDisplay?.trim() || DEFAULT_PHONE_DISPLAY,
    });
  } catch (error) {
    console.error("Errore get site settings:", error);
    res.status(500).json({ message: "Errore server" });
  }
};

export const updateSiteSettingsController = async (req, res) => {
  try {
    const { publicEmail, instagramUrl, phoneTel, phoneDisplay } = req.body;
    if (typeof publicEmail !== "string" || typeof instagramUrl !== "string") {
      return res.status(400).json({ message: "Email e URL Instagram obbligatori" });
    }
    if (typeof phoneTel !== "string" || typeof phoneDisplay !== "string") {
      return res.status(400).json({ message: "Telefono non valido" });
    }
    const email = publicEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Email non valida" });
    }
    let url = instagramUrl.trim();
    if (url && !/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    if (url) {
      try {
        // eslint-disable-next-line no-new
        new URL(url);
      } catch {
        return res.status(400).json({ message: "URL Instagram non valido" });
      }
    }
    const tel = normalizeTel(phoneTel);
    if (!/^\+39\d{10}$/.test(tel)) {
      return res
        .status(400)
        .json({ message: "Telefono non valido: servono esattamente 10 cifre dopo +39 (mobile italiano)." });
    }

    let doc = await SiteSettings.findOne();
    if (!doc) {
      doc = new SiteSettings({
        publicEmail: email,
        instagramUrl: url || DEFAULT_INSTAGRAM_URL,
        phoneTel: tel,
        phoneDisplay: phoneDisplay.trim() || DEFAULT_PHONE_DISPLAY,
      });
    } else {
      doc.publicEmail = email;
      doc.instagramUrl = url || doc.instagramUrl;
      doc.phoneTel = tel;
      doc.phoneDisplay = phoneDisplay.trim() || DEFAULT_PHONE_DISPLAY;
    }
    await doc.save();
    res.status(200).json({
      message: "Impostazioni aggiornate",
      publicEmail: doc.publicEmail,
      instagramUrl: doc.instagramUrl,
      phoneTel: doc.phoneTel,
      phoneDisplay: doc.phoneDisplay,
    });
  } catch (error) {
    console.error("Errore update site settings:", error);
    res.status(500).json({ message: "Errore server" });
  }
};
