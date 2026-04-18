import mongoose from "mongoose";

const galleryPhotoSchema = new mongoose.Schema(
  {
    categorySlug: { type: String, required: true, index: true },
    imageUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
    caption: { type: String, default: "" },
  },
  { timestamps: true }
);

galleryPhotoSchema.index({ categorySlug: 1, order: 1 });

export default mongoose.model("GalleryPhoto", galleryPhotoSchema, "gallery_photos");
