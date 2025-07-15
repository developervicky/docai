import OpenAI from "openai";

let openaiInstance: OpenAI | null = null;

export const getOpenAIClient = () => {
    if (!openaiInstance) {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not set");
        }
        openaiInstance = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openaiInstance;
};
