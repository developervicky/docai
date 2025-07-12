"use client";
import React from "react";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import { trpc } from "@/app/_trpc/client";
import { ChevronLeft, Ghost, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ChatContextProvider } from "./ChatContext";

interface ChatWrapperProps {
  fileId: string;
}

const ChatWrapper = ({ fileId }: ChatWrapperProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    },
  );

  if (isLoading)
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-slate-200 bg-slate-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h3 className="text-xl font-bold">Loading..</h3>
            <p className="text-sm text-slate-500">
              We&apos;re preparing your PDF.
            </p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );

  if (data?.status === "PROCESSING")
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-slate-200 bg-slate-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h3 className="text-xl font-bold">Processing PDF..</h3>
            <p className="text-sm text-slate-500">This won&apos;t take long.</p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );

  if (data?.status === "FAILED")
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-slate-200 bg-slate-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <XCircle className="h-8 w-8  text-red-500" />
            <h3 className="text-xl font-bold">Too many pages in PDF..</h3>
            <p className="text-sm text-slate-500">
              Your <span className="font-bold">Free plan</span> supports upto 5
              pages per PDF.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "secondary",
                className: "mt-4",
              })}
            >
              <ChevronLeft className="mr-1.5 h-3 w-3" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    );

  return (
    <ChatContextProvider fileId={fileId} >
      <div  className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-slate-200 ">
        <div className="mb-28 flex flex-1 flex-col justify-between">
          <Messages fileId={fileId} />
        </div>

        <ChatInput />
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper;
