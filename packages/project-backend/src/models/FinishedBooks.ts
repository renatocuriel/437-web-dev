import mongoose from "mongoose";

const FinishedBooksSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }] // Stores completed book references
  },
  { collection: process.env.FINISHED_COLLECTION_NAME }
);

export const FinishedBooks = mongoose.model("FinishedBooks", FinishedBooksSchema);
