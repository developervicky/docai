import { Pinecone } from "@pinecone-database/pinecone";

let pineconeInstance: Pinecone | null = null;

export const getPineconeClient = () => {
    if (!pineconeInstance) {
        if (!process.env.PINECONE_API_KEY) {
            throw new Error("PINECONE_API_KEY is not set");
        }
        pineconeInstance = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY,
        });
    }
    return pineconeInstance;
};

