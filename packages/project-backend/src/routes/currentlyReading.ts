import express from "express";
import { verifyAuthToken } from "../routes/auth";
import  { CurrentlyReading } from "../models/CurrentlyReading";
import { User } from "../models/User";

const router = express.Router();

// 📖 Get current book a user is reading
router.get("/", verifyAuthToken, async (req, res) => {
    try {
        const userId = res.locals.token._id;
        const current = await CurrentlyReading.findOne({ userId }).populate("bookId");
        res.json(current || {});
    } catch (err) {
        console.error("Error fetching currently reading:", err);
        res.status(500).json({ error: "Failed to fetch current book" });
    }
});

// 📖 Set a book as currently reading
router.post("/", verifyAuthToken, async (req, res) => {
    try {
        const { bookId, currentPage } = req.body;
        const userId = res.locals.token._id;

        await CurrentlyReading.findOneAndUpdate(
            { userId },
            { bookId, currentPage },
            { upsert: true, new: true }
        );

        await User.findByIdAndUpdate(userId, { currentlyReading: bookId });

        res.json({ message: "Currently reading updated." });
    } catch (err) {
        console.error("Error updating currently reading:", err);
        res.status(500).json({ error: "Failed to update currently reading" });
    }
});

export default router;
