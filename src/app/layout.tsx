import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ibm-mono",
});

export const metadata: Metadata = {
  title: "doc.AI",
  description: "Chat with your document!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen antialiased", ibmMono.className)}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
