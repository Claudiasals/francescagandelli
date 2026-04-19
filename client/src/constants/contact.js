/** Valori di default (allineati al server) prima del fetch /api/site-settings */
export const DEFAULT_SITE_CONTACT = {
  publicEmail: "francescagandelli.ph@gmail.com",
  instagramUrl:
    "https://www.instagram.com/francescagandelli_ph?igsh=bWZ6anl2bTdtcXc1",
  phoneTel: "+393466106008",
  phoneDisplay: "+39 346 610 6008",
};

/** @deprecated usare useSiteSettings().publicEmail nei componenti */
export const PHOTOGRAPHER_EMAIL = DEFAULT_SITE_CONTACT.publicEmail;
