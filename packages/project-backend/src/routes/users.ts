import express, { Request, Response } from "express";
import { verifyAuthToken } from "./auth"; // ✅ Protect route with auth middleware
import { User } from "../models/User"; // ✅ Import User model
import { Credentials } from "../models/Credentials"; // ✅ Import Credentials model
import { imageMiddlewareFactory, handleImageFileErrors } from "../utils/ImageUploadMiddleware";

const router = express.Router();

// 🟢 Get Logged-in User Data
router.get("/me", verifyAuthToken, async (req, res) => {
    try {
        const username = res.locals.token.username; // ✅ Extract username from token
        const user = await User.findOne({ username });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json(user);
    } catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).json({ error: "Failed to retrieve user" });
    }
});

export default router;

router.put("/update-username", verifyAuthToken, async (req, res) => {
    try {
        const { newUsername } = req.body;
        const currentUsername = res.locals.token.username; // Extract from token

        if (!newUsername) {
            res.status(400).json({ error: "New username is required" });
            return;
        }

        // Update in users collection
        const user = await User.findOneAndUpdate(
            { username: currentUsername },
            { username: newUsername },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        // Update in credentials collection
        const credentials = await Credentials.findOneAndUpdate(
            { username: currentUsername },
            { username: newUsername }
        );

        if (!credentials) {
            res.status(500).json({ error: "Failed to update login credentials" });
            return;
        }

        res.json({ message: "Username updated successfully", user });
    } catch (err) {
        console.error("Error updating username:", err);
        res.status(500).json({ error: "Failed to update username" });
    }
});

router.put("/update-bio", verifyAuthToken, async (req, res) => {
    try {
        const { bio } = req.body;
        const username = res.locals.token.username; // Get current user

        const user = await User.findOneAndUpdate(
            { username },
            { bio },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({ message: "Bio updated successfully", user });
    } catch (err) {
        console.error("Error updating bio:", err);
        res.status(500).json({ error: "Failed to update bio" });
    }
});

// 🟢 Upload Profile Picture
router.post(
    "/upload-profile-pic",
    verifyAuthToken,
    imageMiddlewareFactory.single("image"), // ✅ Image upload middleware
    handleImageFileErrors, // ✅ Handle errors from image processing
    async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                res.status(400).json({ error: "No image uploaded" });
                return;
            }

            const imageUrl = `/userProfilePics/${req.file.filename}`;
            const username = res.locals.token.username;

            const user = await User.findOneAndUpdate(
                { username },
                { profileImage: imageUrl },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            res.json({ message: "Profile picture updated successfully", imageUrl });
        } catch (err) {
            console.error("Error uploading profile picture:", err);
            res.status(500).json({ error: "Failed to upload profile picture" });
        }
    }
);

router.get("/profile-pic", verifyAuthToken, async (req, res) => {
    try {
        const username = res.locals.token.username; // ✅ Extract username from token
        const user = await User.findOne({ username });

        if (!user || !user.profileImage) {
            res.status(404).json({ error: "Profile picture not found" });
            return;
        }

        // ✅ Ensure correct absolute URL
        // const profileImageUrl = `${req.protocol}://${req.get("host")}${user.profileImage}`;
        // const profileImageUrl = `https://${req.get("host")}${user.profileImage}`;
        // const profileImageUrl = `https://dicuriel.csse.dev${user.profileImage.replace(/^http:\/\/.*?:3000/, "")}`;
        const profileImageUrl = `https://dicuriel.csse.dev${user.profileImage.replace(":3000", "")}`;
        console.log("Profile Image URL:", profileImageUrl);

        res.json({ profileImage: profileImageUrl });
    } catch (err) {
        console.error("Error fetching profile picture:", err);
        res.status(500).json({ error: "Failed to retrieve profile picture" });
    }
});
