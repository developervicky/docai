"use client";
import React, { useState } from "react";
import UploadButton from "./UploadButton";
import { trpc } from "@/app/_trpc/client";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
const Dashboard = () => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);
  const utils = trpc.useContext();
  //   force to refresh the dat rather than reloading whole page

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id);
    },
    onSettled() {
      setCurrentlyDeletingFile(null);
    },
  });

  return (
    <main className="mx-auto min-h-[calc(100vh-9rem)] max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 text-5xl font-bold text-slate-900">My Files</h1>
        <UploadButton />
      </div>
      {/* displaying all files user have */}
      {files && files?.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-slate-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((file) => {
              const { name, createdAt, id } = file;
              return (
                <li
                  key={file.id}
                  className="col-span-1 divide-y divide-slate-200 rounded-lg bg-white transition hover:shadow-lg"
                >
                  <Link
                    href={`/dashboard/${file.id}`}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex w-full items-center justify-between space-x-6 px-6 pt-6">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-lime-500 to-green-500" />
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-lg font-bold text-slate-900">
                            {name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-4 grid grid-cols-3 place-items-center gap-6 px-6 py-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {format(new Date(createdAt), "MMM yyyy")}
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> mocked
                    </div>
                    <Button
                      onClick={() => deleteFile({ id })}
                      variant={"destructive"}
                      size="sm"
                      className="w-full"
                    >
                      {currentlyDeletingFile === id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </li>
              );
            })}
        </ul>
      ) : isLoading ? (
        <Skeleton
          height={100}
          className="my-2"
          count={3}
          baseColor="#e2e8f0"
          highlightColor="#cbd5e1"
        />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 animate-bounce text-primary" />
          <h3 className="text-xl font-semibold">Pretty empty around here</h3>
          <p>Let&apos;s upload your first PDF.</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
