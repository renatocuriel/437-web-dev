import { Request, Response, NextFunction } from "express";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

class ImageFormatError extends Error {}

// Read the upload directory from environment variables (default to "uploads")
const IMAGE_UPLOAD_DIR = process.env.PROFILE_PIC_DIR || "userProfilePics";
if (!fs.existsSync(IMAGE_UPLOAD_DIR)) {
    fs.mkdirSync(IMAGE_UPLOAD_DIR, { recursive: true });
}

const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        // Store files in the configured upload directory
        cb(null, IMAGE_UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        // Extract file extension based on MIME type
        let fileExtension: string;
        switch (file.mimetype) {
            case "image/png":
                fileExtension = "png";
                break;
            case "image/jpeg":
            case "image/jpg":
                fileExtension = "jpg";
                break;
            default:
                return cb(new ImageFormatError("Unsupported image type"), "");
        }

        // Generate a unique filename
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExtension}`;
        cb(null, fileName);
    }
});

// Configure multer with storage settings and file size limit (5 MB)
export const imageMiddlewareFactory = multer({
    storage: storageEngine,
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024, // 5 MB limit
    },
});

// Middleware to handle file format errors
export function handleImageFileErrors(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof multer.MulterError || err instanceof ImageFormatError) {
        res.status(400).send({
            error: "Bad Request",
            message: err.message,
        });
        return;
    }
    next(err); // Pass to next error handler if it's a different error
}
