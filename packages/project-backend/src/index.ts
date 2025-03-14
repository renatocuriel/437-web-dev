import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { MongoClient } from "mongodb";
import { registerAuthRoutes, verifyAuthToken } from "./routes/auth"; // ✅ Keeping auth logic

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env

const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";

async function setUpServer() {
    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;
    console.log("Attempting Mongo connection...");

    const mongoClient = await MongoClient.connect(connectionString);
    console.log("✅ Connected to MongoDB");

    const app = express();
    app.use(express.json());
    app.use(express.static(staticDir));

    // ✅ Authentication routes (public)
    registerAuthRoutes(app, mongoClient);

    // ✅ Protect only API routes (React handles UI protection)
    app.use("/api/*", verifyAuthToken);

    // ✅ Serve frontend (React app handles protected routes)
    app.get("*", (req: Request, res: Response) => {
        console.log(`No static file found for ${req.url}, serving index.html`);
        res.sendFile(path.resolve(staticDir, "index.html"));
    });

    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}

setUpServer();