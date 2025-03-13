import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";
import { imageMiddlewareFactory, handleImageFileErrors } from "../imageUploadMiddleware";

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

    // app.post(
    //     "/api/images",
    //     imageMiddlewareFactory.single("image"), // Match input field name
    //     handleImageFileErrors,
    //     async (req: Request, res: Response) => {
    //         // Final handler function after the above two middleware functions finish running
    //         console.log("Uploaded file:", req.file);
    //         console.log("Request body:", req.body);
    //         res.status(500).send("Not implemented");
    //     }
    // )

    app.post(
        "/api/images",
        imageMiddlewareFactory.single("image"), // ✅ Processes image upload
        handleImageFileErrors, // ✅ Catches errors
        async (req: Request, res: Response) => {
            try {
                console.log("Uploaded file:", req.file);
                console.log("Decoded Token (for author):", res.locals.token); // ✅ Debugging
    
                if (!req.file || !req.body.name) {
                    res.status(400).json({
                        error: "Bad Request",
                        message: "Missing image file or title",
                    });
                    return;
                }
    
                // ✅ Extract the username from res.locals.token
                const author = res.locals.token?.username ?? "unknown_user"; // Default if not logged in
                console.log("Author determined from token:", author);
    
                // ✅ Generate image metadata
                const filename = req.file.filename;
                const imageTitle = req.body.name;
                const imageSrc = `/uploads/${filename}`;
    
                const imageDocument = {
                    _id: filename,
                    src: imageSrc,
                    name: imageTitle,
                    author: author,  // ✅ Ensure username is stored
                    likes: 0,
                };
    
                // ✅ Store in database
                const imageProvider = new ImageProvider(mongoClient);
                await imageProvider.createImage(imageDocument);
    
                console.log("Image successfully saved:", imageDocument);
                res.status(201).json(imageDocument);
            } catch (error) {
                console.error("Error saving image:", error);
                res.status(500).send({ error: "Internal server error" });
            }
        }
    );
    
}