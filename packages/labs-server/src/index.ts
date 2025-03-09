import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { MongoClient } from "mongodb";
import { registerImageRoutes } from "./routes/images";

const uri = "mongodb+srv://dicuriel:csc437@cluster0.a1aq2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";

async function setUpServer() {
    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

    const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;
    
    console.log("Attempting Mongo connection at " + connectionStringRedacted);
    
    const mongoClient = await MongoClient.connect(connectionString);
    const collectionInfos = await mongoClient.db().listCollections().toArray();
    console.log(collectionInfos.map(collectionInfo => collectionInfo.name)); // For debug only
    
    
    const app = express();
    app.use(express.json());
    app.use(express.static(staticDir));

    app.get("/hello", (req: Request, res: Response) => {
        console.log(`Received request for ${req.url}`);
        res.send("Hello, World");
    });

    registerImageRoutes(app, mongoClient);

    // app.get("/api/images", async (req: Request, res: Response) => {
    //     try {
    //         const imageProvider = new ImageProvider(mongoClient);
    //         const images = await imageProvider.getAllImages();
    //         res.json(images);
    //     } 
    //     catch (e) {
    //         console.error(e);
    //         res.status(500).send("An error occurred while fetching images.");
    //     }
    // });
    
    app.get("*", (req: Request, res: Response) => {
        console.log(`No static file found for ${req.url}, serving index.html`);
        res.sendFile(path.resolve(staticDir, "index.html"));
    });
    
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

setUpServer();
