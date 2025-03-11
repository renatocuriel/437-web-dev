import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/images", async (req: Request, res: Response) => {
        try {
            let userId: string | undefined = undefined;
            if (typeof req.query.createdBy === "string") {
                userId = req.query.createdBy;
            }
            console.log(`Received request for images created by ${userId}`);
            const imageProvider = new ImageProvider(mongoClient);
            const images = await imageProvider.getAllImages(userId);
            res.json(images);
        } catch (e) {
            console.error(e);
            res.status(500).send("An error occurred while fetching images.");
        }
    });

    // PATCH: Update image name
    app.patch("/api/images/:id", async (req: Request, res: Response): Promise<void> => {
        try {
            const imageId = req.params.id;
            const { name } = req.body;

            if (!name) {
                res.status(400).json({
                    error: "400 Bad request",
                    message: "Missing name property",
                });
                return;
            }

            console.log(`Received request to update image ${imageId} with new name: ${name}`);
            
            const imageProvider = new ImageProvider(mongoClient);
            const updatedCount = await imageProvider.updateImageName(imageId, name);

            if (updatedCount === 0) {
                res.status(404).json({
                    error: "404 Not found",
                    message: "Image does not exist",
                });
                return;
            }

            res.status(204).send(); // No content
        } catch (e) {
            console.error(e);
            res.status(500).send("An error occurred while updating the image.");
        }
    });
    
}