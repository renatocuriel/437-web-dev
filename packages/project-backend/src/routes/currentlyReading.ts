import express from "express";
import { verifyAuthToken } from "../routes/auth";
import { CurrentlyReading } from "../models/CurrentlyReading";
import { User } from "../models/User";
import { FinishedBooks } from "../models/FinishedBooks";

const router = express.Router();

// 📖 Set a book as currently reading
router.post("/", verifyAuthToken, async (req, res) => {
    try {
        const { bookId, currentPage } = req.body;
        const user = await User.findOne({ username: res.locals.token.username });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        // Upsert currently reading entry
        await CurrentlyReading.findOneAndUpdate(
            { userId: user._id },
            { bookId, currentPage },
            { upsert: true, new: true }
        );

        res.json({ message: "Currently reading updated." });
    } catch (err) {
        console.error("Error updating currently reading:", err);
        res.status(500).json({ error: "Failed to update currently reading" });
    }
});

// 📖 Get the user's currently reading book
router.get("/", verifyAuthToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: res.locals.token.username });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const currentlyReading = await CurrentlyReading.findOne({ userId: user._id }).populate("bookId");
        res.json(currentlyReading || {});
    } catch (err) {
        console.error("Error fetching currently reading:", err);
        res.status(500).json({ error: "Failed to fetch current book" });
    }
});

// 📖 Update currentPage progress (PATCH)
router.patch("/", verifyAuthToken, async (req, res) => {
    try {
        const { currentPage } = req.body;
        const user = await User.findOne({ username: res.locals.token.username });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const updatedReading = await CurrentlyReading.findOneAndUpdate(
            { userId: user._id },
            { currentPage },
            { new: true }
        );

        if (!updatedReading) {
            res.status(404).json({ error: "No currently reading book found." });
            return;
        }

        res.json({ message: "Reading progress updated.", updatedReading });
    } catch (err) {
        console.error("Error updating reading progress:", err);
        res.status(500).json({ error: "Failed to update progress." });
    }
});

// 📖 Remove a book from "Currently Reading"
router.delete("/", verifyAuthToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: res.locals.token.username });
        const userId = user?._id;

        // Find and delete the currently reading entry for this user
        const currentlyReading = await CurrentlyReading.findOneAndDelete({ userId });

        if (!currentlyReading) {
            res.status(404).json({ error: "No currently reading book found." });
            return;
        }

        // Move the book to the FinishedBooks collection
        await FinishedBooks.findOneAndUpdate(
            { userId },
            { $addToSet: { books: currentlyReading.bookId } },
            { upsert: true, new: true }
        );

        // Now delete the currently reading entry
        await CurrentlyReading.findOneAndDelete({ userId });

        res.json({ message: "Book removed from currently reading and added to user's finished." });
    } catch (err) {
        console.error("Error removing currently reading:", err);
        res.status(500).json({ error: "Failed to remove book." });
    }
});

export default router;
