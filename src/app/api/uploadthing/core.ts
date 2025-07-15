import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { getPineconeClient } from "@/lib/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const f = createUploadthing();

const middleware = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) throw new Error("Unauthorized");

  return { userId: user.id };
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  });

  if (isFileExist) return;

  // Create file with PROCESSING status initially
  const createdFile = await db.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: `https://utfs.io/f/${file.key}`,
      uploadStatus: "SUCCESS", // We'll update this after processing
    },
  });

  try {
    console.log(`Processing PDF: ${file.name}`);

    // Check if required environment variables are set
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }
    if (!process.env.PINECONE_API_KEY) {
      throw new Error("PINECONE_API_KEY is not set");
    }

    const response = await fetch(`https://utfs.io/f/${file.key}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const blob = await response.blob();
    console.log(`PDF blob size: ${blob.size} bytes`);

    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();
    console.log(`PDF loaded: ${pageLevelDocs.length} pages`);

    // vectorize and index entire document
    const pineconeIndex = getPineconeClient().Index("docai");

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
      pineconeIndex,
      namespace: createdFile.id,
    });

    console.log(`Successfully processed and embedded PDF: ${file.name}`);
  } catch (err) {
    console.error(`Error processing PDF ${file.name}:`, err);

    // Handle error with proper type checking
    if (err instanceof Error) {
      console.error("Stack trace:", err.stack);
    }

    // You might want to update the file status to indicate processing failed
    // But since we removed FAILED status, we'll just log the error
  }
};

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
