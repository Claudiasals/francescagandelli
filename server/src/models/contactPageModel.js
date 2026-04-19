import mongoose from "mongoose";

const contactPageSchema = new mongoose.Schema(
  {
    introText: { type: String, default: "" },
    formLeadText: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("ContactPage", contactPageSchema, "contact_page");
