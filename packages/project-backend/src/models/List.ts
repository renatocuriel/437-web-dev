import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    listName: { type: String, required: true }, // User-defined name
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }] // Array of book references
  },
  { collection: process.env.LISTS_COLLECTION_NAME }
);

export const List = mongoose.model("List", ListSchema);
