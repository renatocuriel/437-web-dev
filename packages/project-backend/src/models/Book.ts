import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: [{ type: String, required: true }], // Array for multiple authors
    coverImage: { type: String, required: true },
    genre: [{ type: String }], // Array to allow multiple genres
    totalPages: { type: Number, required: true },
    description: { type: String, required: true },
    previewLink: { type: String } // Optional link to Google Books preview
  },
  { collection: process.env.BOOKS_COLLECTION_NAME }
);

export const Book = mongoose.model("Book", BookSchema);
