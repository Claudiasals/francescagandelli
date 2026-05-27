import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    /** Email pubblica (mailto, footer, moduli) e destinazione messaggi dal form */
    publicEmail: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("SiteSettings", siteSettingsSchema, "site_settings");
