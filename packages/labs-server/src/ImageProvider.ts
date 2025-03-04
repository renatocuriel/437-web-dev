import { MongoClient, ObjectId } from "mongodb";

interface User {
    _id: string;
    username: string;
    email: string;
}

interface Image {
    _id: string;
    src: string;
    name: string;
    author: string | User;
    likes: number;
}

export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllImages(): Promise<Image[]> {
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
        const usersCollectionName = process.env.USERS_COLLECTION_NAME;

        if (!imagesCollectionName || !usersCollectionName) {
            throw new Error("Missing collection names from environment variables");
        }

        const imagesCollection = this.mongoClient.db().collection<Image>(imagesCollectionName);
        const usersCollection = this.mongoClient.db().collection<User>(usersCollectionName);

        // Fetch all images
        const images = await imagesCollection.find().toArray();

        // Denormalize: Replace `author` ID with the full user object
        for (const image of images) {
            if (typeof image.author === "string") { // Ensure it's a string before querying
                const user = await usersCollection.findOne({ _id: image.author });

                if (user) {
                    image.author = { _id: user._id, username: user.username, email: user.email }; // Cast to User type
                } else {
                    image.author = { _id: image.author, username: "Unknown", email: "" }; // Fallback user object
                }
            }
        }

        return images;
    }
}