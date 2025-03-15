import express from "express";
import { verifyAuthToken } from "./auth"; // ✅ Protect route with auth middleware
import { User } from "../models/User"; // ✅ Import User model

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
