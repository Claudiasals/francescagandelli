import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    text: { type: String, default: "" },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema, "about");
