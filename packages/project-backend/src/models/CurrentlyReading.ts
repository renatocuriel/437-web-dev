import mongoose from "mongoose";

const CurrentlyReadingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User reference
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, // Book reference
    currentPage: { type: Number, required: true } // Track progress
  },
  { collection: process.env.CURRENTLY_READING_COLLECTION_NAME }
);

export const CurrentlyReading = mongoose.model("CurrentlyReading", CurrentlyReadingSchema);
