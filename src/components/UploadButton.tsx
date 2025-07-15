"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const UploadDropzone = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { toast } = useToast();

  const { startUpload } = useUploadThing("pdfUploader");

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setUploading(true);
        const progressInterval = startSimulatedProgress();

        // handle file uploading
        const res = await startUpload(acceptedFile);

        if (!res) {
          return toast({
            variant: "destructive",
            title: "Someting went wrong!",
            description: "Please check you file size/try later",
          });
        }

        const [fileResponse] = res;
        const key = fileResponse?.key;
        if (!key) {
          return toast({
            variant: "destructive",
            title: "Someting went wrong!",
            description: "Please try again later",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);
        startPolling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="m-4 h-64 rounded-lg border border-dashed border-slate-400"
        >
          <div className="flex h-full w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-slate-50 hover:bg-slate-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <Cloud className="mb-2 h-6 w-6 animate-bounce text-primary" />
                <p className="mb-2 text-center text-sm text-slate-700">
                  <span className="font-bold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="mb-2 text-center text-xs text-slate-500">
                  PDF (up to 16MB)
                </p>
                <p className="mb-2 max-w-sm text-center text-xs text-slate-400">
                  If your browser does not opening the file explorer. Don&apos;t
                  worry, just drag and drop
                </p>
              </div>
              {acceptedFiles && acceptedFiles[0] ? (
                <div className="mx-w-xs flex items-center divide-x divide-slate-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-slate-200">
                  <div className="grid h-full place-items-center px-3 py-2 ">
                    <File className="h-4 w-4 text-primary" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {uploading ? (
                <div className="mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    value={uploadProgress}
                    className="h-1 w-full bg-slate-200"
                  />
                  {uploadProgress === 100 ? (
                    <div
                      className="flex items-center justify-center gap-1 p-2 text-center text-sm text-slate-700
                  "
                    >
                      <Loader2 className="h-3 w-3 animate-spin text-primary" />
                    </div>
                  ) : null}
                </div>
              ) : null}
              <input
                type="file"
                id="dropzone-file"
                className="hidden"
                {...getInputProps}
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
