import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { MongoClient } from "mongodb";
import { registerImageRoutes } from "./routes/images";
import { registerAuthRoutes, verifyAuthToken } from "./routes/auth";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env

const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";

async function setUpServer() {
    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;
    console.log("Attempting Mongo connection...");

    const mongoClient = await MongoClient.connect(connectionString);
    const collectionInfos = await mongoClient.db().listCollections().toArray();
    console.log(collectionInfos.map(collectionInfo => collectionInfo.name)); // For debug only
    
    
    const app = express();
    app.use(express.json());
    app.use(express.static(staticDir));
    app.use("/uploads", express.static(process.env.IMAGE_UPLOAD_DIR || "uploads"));
    
    registerAuthRoutes(app, mongoClient);
    app.use("/api/*", verifyAuthToken); // Apply the verifyAuthToken middleware to all routes under /api

    registerImageRoutes(app, mongoClient);
    
    app.get("*", (req: Request, res: Response) => {
        console.log(`No static file found for ${req.url}, serving index.html`);
        res.sendFile(path.resolve(staticDir, "index.html"));
    });
    
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

setUpServer();
