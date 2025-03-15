// import { Collection, MongoClient } from "mongodb";
// import bcrypt from "bcryptjs";

// interface ICredentialsDocument {
//     username: string;
//     password: string;
// }

// export class CredentialsProvider {
//     private readonly collection: Collection<ICredentialsDocument>;

//     constructor(mongoClient: MongoClient) {
//         const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
//         if (!COLLECTION_NAME) {
//             throw new Error("Missing CREDS_COLLECTION_NAME from env file");
//         }
//         this.collection = mongoClient.db().collection<ICredentialsDocument>(COLLECTION_NAME);
//     }

//     async registerUser(username: string, plaintextPassword: string): Promise<boolean> {
//         // Check if the username already exists
//         const existingUser = await this.collection.findOne({ username });
//         if (existingUser) {
//             return false; // User already exists
//         }

//         // Generate a salt and hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

//         // Store the new user in the database
//         await this.collection.insertOne({ username, password: hashedPassword });

//         // Wait for any DB operations to finish before returning!
//         return true;
//     }

//     async verifyPassword(username: string, plaintextPassword: string): Promise<boolean> {
//         const user = await this.collection.findOne({ username });
//         if (!user) {
//             return false; // User does not exist
//         }

//         // Compare plaintext password with the stored hashed password
//         return await bcrypt.compare(plaintextPassword, user.password);
//     }
// }

import bcrypt from "bcryptjs";
import { Credentials } from "../models/Credentials"; // ✅ Import Mongoose Model
import { User } from "../models/User";

export class CredentialsProvider {
    constructor() {
        // ✅ No need for MongoClient anymore, Mongoose handles everything
    }

    // 🟢 Register New User
    async registerUser(username: string, plaintextPassword: string): Promise<boolean> {
        const existingUser = await Credentials.findOne({ username });
        if (existingUser) {
            return false; // ❌ Username already exists
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

        await Credentials.create({ username, password: hashedPassword }); // ✅ Mongoose handles insert

        await User.create({ username }); // ✅ Store in users collection (for public user data)
        return true;
    }

    // 🔑 Verify User Password
    async verifyPassword(username: string, plaintextPassword: string): Promise<boolean> {
        const user = await Credentials.findOne({ username });
        if (!user) {
            return false; // ❌ User does not exist
        }

        return await bcrypt.compare(plaintextPassword, user.password);
    }
}
