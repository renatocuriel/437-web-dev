import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true }, // Duplicate username from credentials
    createdAt: { type: Date, default: Date.now }, // Auto-set timestamp
    profileImage: { type: String, default: "/uploads/default_profile.jpg" } // User-uploaded avatar
  },
  { collection: process.env.USERS_COLLECTION_NAME }
);

export const User = mongoose.model("User", UserSchema);
