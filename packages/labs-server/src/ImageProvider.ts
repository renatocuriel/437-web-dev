import { MongoClient } from "mongodb";

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

    async getAllImages(authorId?: string): Promise<Image[]> {
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
        const usersCollectionName = process.env.USERS_COLLECTION_NAME;
    
        if (!imagesCollectionName || !usersCollectionName) {
            throw new Error("Missing collection names from environment variables");
        }
    
        const imagesCollection = this.mongoClient.db().collection<Image>(imagesCollectionName);
        const usersCollection = this.mongoClient.db().collection<User>(usersCollectionName);
    
        // Create a filter object
        const filter = authorId ? { author: authorId } : {};
    
        // Fetch filtered images
        const images = await imagesCollection.find(filter).toArray();
    
        // Denormalize author field
        for (const image of images) {
            if (typeof image.author === "string") {
                const user = await usersCollection.findOne({ _id: image.author });
    
                image.author = user
                    ? { _id: user._id, username: user.username, email: user.email }
                    : { _id: image.author, username: "Unknown", email: "" };
            }
        }
    
        return images;
    }

    async updateImageName(imageId: string, newName: string): Promise<number> {
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
    
        if (!imagesCollectionName) {
            throw new Error("Missing collection name from environment variables");
        }
    
        const imagesCollection = this.mongoClient.db().collection<Image>(imagesCollectionName);
        
        const result = await imagesCollection.updateOne(
            { _id: imageId },
            { $set: { name: newName } }
        );
    
        return result.matchedCount;
    }
    
    async createImage(image: any) {
        const db = this.mongoClient.db();
        const collection = db.collection("images");
        await collection.insertOne(image);
    }

}