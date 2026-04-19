import mongoose from "mongoose";

const legalPagesSchema = new mongoose.Schema(
  {
    privacyText: { type: String, default: "" },
    cookieText: { type: String, default: "" },
    termsText: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("LegalPages", legalPagesSchema, "legal_pages");
