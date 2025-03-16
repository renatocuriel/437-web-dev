// import express, { Request, Response, NextFunction } from "express";
// import { MongoClient } from "mongodb";
// import { CredentialsProvider } from "../CredentialsProvider";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const signatureKey: jwt.Secret = process.env.JWT_SECRET as string;
// if(!signatureKey) {
//     throw new Error("Missing JWT_SECRET from env file");
// }

// export function verifyAuthToken(
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): void {
//     console.log("Received request to protected route:", req.path);
//     console.log("Headers received:", req.headers);
//     const authHeader = req.get("Authorization");
//     const token = authHeader && authHeader.split(" ")[1]; // Extract the token after "Bearer "

//     if (!token) {
//         res.status(401).json({ error: "Unauthorized", message: "Missing token" });
//         return;
//     }

//     jwt.verify(token, signatureKey, (error, decoded) => {
//         if (error) {
//             res.status(403).json({ error: "Forbidden", message: "Invalid token" });
//             return;
//         }
//         res.locals.token = decoded;
//         next(); // Token valid, proceed to the next middleware or route handler
//     });
// }

// function generateAuthToken(username: string): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//         jwt.sign(
//             { username: username },
//             signatureKey,
//             { expiresIn: "1d" }, // Token valid for 24 hours
//             (error, token) => {
//                 if (error) reject(error);
//                 else resolve(token as string);
//             }
//         );
//     });
// }
// export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
//     const credentialsProvider = new CredentialsProvider(mongoClient);

//     // Register user route
//     app.post("/auth/register", (req: Request, res: Response) => {
//         (async () => {
//             console.log("Received request to register user");

//             const { username, password } = req.body;

//             // Case 1: Missing username or password
//             if (!username || !password) {
//                 return res.status(400).send({
//                     error: "Bad request",
//                     message: "Missing username or password",
//                 });
//             }

//             try {
//                 // Attempt to register the user
//                 const success = await credentialsProvider.registerUser(username, password);

//                 // Case 2: Username already taken
//                 if (!success) {
//                     return res.status(400).send({
//                         error: "Bad request",
//                         message: "Username already taken",
//                     });
//                 }

//                 // Case 3: Registration successful → Generate JWT Token
//                 const token = await generateAuthToken(username);
//                 res.status(201).send({ token }); // Send token in response

//             } catch (error) {
//                 console.error("Error during registration:", error);
//                 res.status(500).send({ error: "Internal server error" });
//             }
//         })().catch(err => console.error("Unhandled error in /auth/register:", err));
//     });

//     // User login route
//     app.post("/auth/login", (req: Request, res: Response) => {
//         (async () => {
//             console.log("Received login request");

//             const { username, password } = req.body;

//             // Case 1: Missing username or password
//             if (!username || !password) {
//                 return res.status(400).send({
//                     error: "Bad request",
//                     message: "Missing username or password",
//                 });
//             }

//             try {
//                 // Check if the username and password are correct
//                 const isValid = await credentialsProvider.verifyPassword(username, password);

//                 // Case 2: Incorrect username or password
//                 if (!isValid) {
//                     return res.status(401).send({
//                         error: "Unauthorized",
//                         message: "Incorrect username or password",
//                     });
//                 }

//                 // Case 3: Login successful
//                 // Generate JWT token
//                 const token = await generateAuthToken(username);

//                 res.send({ token }); // Return the token in the response
//             } catch (error) {
//                 console.error("Error during login:", error);
//                 res.status(500).send({ error: "Internal server error" });
//             }
//         })().catch(err => console.error("Unhandled error in /auth/login:", err));
//     });
// }

import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CredentialsProvider } from "../utils/CredentialsProvider"; // Now uses Mongoose!

dotenv.config();

const signatureKey: jwt.Secret = process.env.JWT_SECRET as string;
if (!signatureKey) {
    throw new Error("❌ Missing JWT_SECRET from env file");
}

// 🔹 Middleware to Verify JWT Token
export function verifyAuthToken(req: Request, res: Response, next: NextFunction): void {
    console.log("🔐 Received request to protected route:", req.path);
    console.log("📜 Headers received:", req.headers);


    const authHeader = req.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1]; // Extract token after "Bearer "

    if (!token) {
        res.status(401).json({ error: "Unauthorized", message: "Missing token" });
        return;
    }

    jwt.verify(token, signatureKey, (error, decoded) => {
        if (error) {
            res.status(403).json({ error: "Forbidden", message: "Invalid token" });
            return;
        }
        if (decoded) {
        res.locals.token = decoded;
        console.log("🔓 Token verified:", decoded);
        }
        next(); // ✅ Token valid, proceed to the next middleware or route handler
    });
}

// 🔹 Generate JWT Token for Authenticated Users
function generateAuthToken(username: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username },
            signatureKey,
            { expiresIn: "1d" }, // Token valid for 24 hours
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

// 🔹 Register Authentication Routes
export function registerAuthRoutes(app: express.Application) {
    const credentialsProvider = new CredentialsProvider(); // ✅ No more MongoClient needed!

    // 🟢 Register User Route
    app.post("/auth/register", async (req: Request, res: Response) => {
        console.log("📩 Received request to register user");

        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password",
            });
            return;
        }

        try {
            const success = await credentialsProvider.registerUser(username, password);

            if (!success) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Username already taken",
                });
                return;
            }

            // ✅ Generate JWT Token
            const token = await generateAuthToken(username);
            res.status(201).send({ token }); // ✅ Send token in response

        } catch (error) {
            console.error("❌ Error during registration:", error);
            res.status(500).send({ error: "Internal server error" });
        }
    });

    // 🟢 User Login Route
    app.post("/auth/login", async (req: Request, res: Response) => {
        console.log("📩 Received login request");

        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password",
            });
            return;
        }

        try {
            const isValid = await credentialsProvider.verifyPassword(username, password);

            if (!isValid) {
                res.status(401).send({
                    error: "Unauthorized",
                    message: "Incorrect username or password",
                });
                return;
            }

            // ✅ Generate JWT Token
            const token = await generateAuthToken(username);
            res.send({ token });

        } catch (error) {
            console.error("❌ Error during login:", error);
            res.status(500).send({ error: "Internal server error" });
        }
    });
}
