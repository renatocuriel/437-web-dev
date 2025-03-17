// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import path from "path";
// import { MongoClient } from "mongodb";
// import { registerAuthRoutes, verifyAuthToken } from "./routes/auth"; // ✅ Keeping auth logic

// dotenv.config(); // Read the .env file in the current working directory, and load values into process.env

// const PORT = process.env.PORT || 3000;
// const staticDir = process.env.STATIC_DIR || "public";

// async function setUpServer() {
//     const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

//     const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;
//     console.log("Attempting Mongo connection...");

//     const mongoClient = await MongoClient.connect(connectionString);
//     console.log("✅ Connected to MongoDB");

//     const app = express();
//     app.use(express.json());
//     app.use(express.static(staticDir));

//     // ✅ Authentication routes (public)
//     registerAuthRoutes(app, mongoClient);

//     // ✅ Protect only API routes (React handles UI protection)
//     app.use("/api/*", verifyAuthToken);

//     // ✅ Serve frontend (React app handles protected routes)
//     app.get("*", (req: Request, res: Response) => {
//         console.log(`No static file found for ${req.url}, serving index.html`);
//         res.sendFile(path.resolve(staticDir, "index.html"));
//     });

//     app.listen(PORT, () => {
//         console.log(`🚀 Server running at http://localhost:${PORT}`);
//     });
// }

// setUpServer();

// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import path from "path";
// import { MongoClient } from "mongodb";
// import { registerAuthRoutes, verifyAuthToken } from "./routes/auth";
// import bookRoutes from "./routes/books";
// import currentlyReadingRoutes from "./routes/currentlyReading";
// import listsRoutes from "./routes/lists";
// import finishedBooksRoutes from "./routes/finishedBooks";
// import googleBooksRoutes from "./routes/googleBooks";

// dotenv.config(); // Load environment variables

// const PORT = process.env.PORT || 3000;
// const staticDir = process.env.STATIC_DIR || "public";

// async function setUpServer() {
//     const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

//     const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;
//     console.log("Attempting MongoDB connection...");

//     const mongoClient = await MongoClient.connect(connectionString);
//     console.log("✅ Connected to MongoDB");

//     const app = express();
//     app.use(express.json());
//     app.use(express.static(staticDir));

//     // ✅ Register Authentication Routes (Public)
//     registerAuthRoutes(app, mongoClient);

//     // ✅ Protect API Routes
//     app.use("/api/*", verifyAuthToken);

//     // ✅ Register API Routes
//     app.use("/api/books", bookRoutes);
//     app.use("/api/currently-reading", currentlyReadingRoutes);
//     app.use("/api/lists", listsRoutes);
//     app.use("/api/finished-books", finishedBooksRoutes);
//     app.use("/api/google-books", googleBooksRoutes);

//     // ✅ Serve React Frontend
//     app.get("*", (req: Request, res: Response) => {
//         console.log(`No static file found for ${req.url}, serving index.html`);
//         res.sendFile(path.resolve(staticDir, "index.html"));
//     });

//     app.listen(PORT, () => {
//         console.log(`🚀 Server running at http://localhost:${PORT}`);
//     });
// }

// setUpServer();

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose"; // ✅ Use Mongoose instead of MongoClient
import { registerAuthRoutes, verifyAuthToken } from "./routes/auth";
import usersRoutes from "./routes/users";
import bookRoutes from "./routes/books";
import currentlyReadingRoutes from "./routes/currentlyReading";
import listsRoutes from "./routes/lists";
import finishedBooksRoutes from "./routes/finishedBooks";
import googleBooksRoutes from "./routes/googleBooks";

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";
const profilePicsPath = path.resolve("/home/dicuriel/437-web-dev/packages/project-backend/userProfilePics");

async function setUpServer() {
    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

    if (!MONGO_USER || !MONGO_PWD || !MONGO_CLUSTER || !DB_NAME) {
        throw new Error("❌ Missing MongoDB connection details in .env");
    }

    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

    try {
        console.log("Attempting MongoDB connection...");
        await mongoose.connect(connectionString);
        console.log("✅ Connected to MongoDB");

        const app = express();
        app.use(express.json());
        app.use(express.static(staticDir));
        // app.use("/userProfilePics", express.static(sshProfilePicsPath));
        // ✅ Force HTTPS if needed
        app.use("/userProfilePics", (req, res, next) => {
            if (req.secure) {
                express.static(profilePicsPath)(req, res, next);
            } else {
                res.redirect(`https://${req.get("host")}${req.url}`);
            }
        });


        // ✅ Register Authentication Routes (Public)
        registerAuthRoutes(app); // 🔹 Removed MongoClient parameter

        // ✅ Protect API Routes
        app.use("/api/*", verifyAuthToken);

        // ✅ Register API Routes
        app.use("/api/users", usersRoutes);
        app.use("/api/books", bookRoutes);
        app.use("/api/currently-reading", currentlyReadingRoutes);
        app.use("/api/lists", listsRoutes);
        app.use("/api/finished-books", finishedBooksRoutes);
        app.use("/api/google-books", googleBooksRoutes);

        // ✅ Serve React Frontend
        app.get("*", (req: Request, res: Response) => {
            console.log(`No static file found for ${req.url}, serving index.html`);
            res.sendFile(path.resolve(staticDir, "index.html"));
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
}

setUpServer();
