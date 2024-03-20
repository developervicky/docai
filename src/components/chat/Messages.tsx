import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { Loader2, MessageSquare } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Message from "./Message";

interface MessagesProps {
  fileId: string;
}

const Messages = ({ fileId }: MessagesProps) => {
  const { data, isLoading, fetchNextPage } =
    trpc.getFileMessages.useInfiniteQuery(
      {
        fileId,
        limit: INFINITE_QUERY_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
      },
    );
  const messages = data?.pages.flatMap((page) => page.messages);

  const loadingMessage = {
    createdAt: new Date().toISOString(),
    id: "loading-message",
    isUserMessage: false,
    text: (
      <span className="flex h-full items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </span>
    ),
  };

  const combinedMessages = [
    ...(true ? [loadingMessage] : []),
    ...(messages ?? []),
  ];
  return (
    <div className="scrollbar-thumb-green scrollbar-thumb-rounded scrollbar-track-green-lighter scrollbar-w-2 scrolling-touch flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col-reverse gap-4 overflow-y-auto border-slate-200 p-3">
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((message, i) => {
          const isNextMessageSamePerson =
            combinedMessages[i - 1]?.isUserMessage ===
            combinedMessages[i]?.isUserMessage;
          if (i === combinedMessages.length - 1) {
            return (
              <Message
                isNextMessageSamePerson={isNextMessageSamePerson}
                message={message}
                key={message.id}
              />
            );
          } else
            return (
              <Message
                isNextMessageSamePerson={isNextMessageSamePerson}
                message={message}
                key={message.id}
              />
            );
        })
      ) : isLoading ? (
        <div className="flex w-full flex-col gap-2">
          <Skeleton
            className="h-16"
            baseColor="#e2e8f0"
            highlightColor="#cbd5e1"
          />
          <Skeleton
            className="h-16"
            baseColor="#e2e8f0"
            highlightColor="#cbd5e1"
          />
          <Skeleton
            className="h-16"
            baseColor="#e2e8f0"
            highlightColor="#cbd5e1"
          />
          <Skeleton
            className="h-16"
            baseColor="#e2e8f0"
            highlightColor="#cbd5e1"
          />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-bold">You&apos;re all set!</h3>
          <p className="text-sm text-slate-500">
            Ask your first question to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
