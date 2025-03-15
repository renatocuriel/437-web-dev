import mongoose from "mongoose";

const CredentialsSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
  },
  { collection: process.env.CREDS_COLLECTION_NAME }
);

export const Credentials = mongoose.model("Credentials", CredentialsSchema);
