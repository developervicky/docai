import { cn } from "@/lib/utils";
import { ExtendedMessage } from "@/types/message";
import { Icons } from "./Icons";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { forwardRef } from "react";

interface MessageProps {
  message: ExtendedMessage;
  isNextMessageSamePerson: boolean;
}
const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isNextMessageSamePerson }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(`flex items-end`, {
          "justify-end": message?.isUserMessage,
        })}
      >
        <div
          className={cn(
            `relative flex aspect-square h-6 w-6 items-center justify-center`,
            {
              "order-2 rounded-sm bg-primary": message?.isUserMessage,
              "order-1 rounded-sm bg-slate-800": !message?.isUserMessage,
              invisible: isNextMessageSamePerson,
            },
          )}
        >
          {message?.isUserMessage ? (
            <Icons.user className="h-3/4 w-3/4 fill-slate-200 text-slate-200" />
          ) : (
            <Icons.logo className="h-3/4 w-3/4  text-slate-200" />
          )}
        </div>
        <div
          className={cn(`mx-2 flex max-w-xl flex-col space-y-2 text-base`, {
            "order-1 items-end": message?.isUserMessage,
            "order-2 items-start": !message?.isUserMessage,
          })}
        >
          <div
            className={cn(`inline-block rounded-lg px-4 py-2`, {
              "bg-primary text-white": message?.isUserMessage,
              "bg-slate-200 text-gray-900": !message?.isUserMessage,
              "rounder-br-none":
                !isNextMessageSamePerson && message?.isUserMessage,
              "rounded-bl-none":
                !isNextMessageSamePerson && !message?.isUserMessage,
            })}
          >
            {typeof message.text === "string" ? (
              <ReactMarkdown
                className={cn(`prose `, {
                  "text-slate-50": message?.isUserMessage,
                })}
              >
                {message.text}
              </ReactMarkdown>
            ) : (
              message.text
            )}
            {message.id !== "loading-message" ? (
              <div
                className={cn(`mt-2 w-full select-none text-right text-xs`, {
                  "text-slate-500": !message?.isUserMessage,
                  "text-white": message?.isUserMessage,
                })}
              >
                {format(new Date(message.createdAt), "HH:mm")}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  },
);

Message.displayName = "Message";

export default Message;
