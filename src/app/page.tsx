import Link from "next/link";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import { ArrowRight, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center   text-center sm:mt-40">
        <div className="hero_gradient relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg px-4 py-10 sm:px-6">
          <div className="absolute -bottom-10 -left-10 ">
            <FileText
              strokeWidth="1px"
              size="lg"
              className="-rotate-[15deg] text-gray-900 opacity-10 "
            />
          </div>
          <div className="mx-auto mb-4  max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200  px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 ">
            <p className="text-sm font-semibold text-white">
              doc.AI is now public
            </p>
          </div>
          <h1 className="max-w-4xl text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Instantaneously converse with yours{" "}
            <span className="text-white">documents.</span>
          </h1>
          <p className="mt-5 max-w-prose  text-white sm:text-lg">
            Doc.AI allows you to engage with any PDF document. Upload your file
            and start asking questions straightaway.
          </p>
          <Link
            className={buttonVariants({
              size: "lg",
              className:
                "group mt-5 !bg-white !font-bold text-slate-900 transition-transform hover:scale-105 hover:!bg-green-100 focus:scale-105 active:scale-105 ",
            })}
            href="/dashboard"
            target="_blank"
          >
            Get Started{" "}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        {/* feature selection */}
        <div className="mx-auto mb-32 mt-32 max-w-7xl sm:mt-56">
          <div className="mb-12 px-3 lg:px-8">
            <div className="mx-auto max-w-3xl text-left sm:text-center">
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
                Start chatting in seconds
              </h2>
              <p className="mt-5 text-lg text-gray-600">
                Are you in hurry to skim your document, searching for specific
                info and so on? Chat with your PDF files to ravel out the
                answers, has never been easier than using doc.AI! 🧑‍💻
              </p>
            </div>
          </div>

          <ol className="my-8 space-y-4 md:flex md:space-x-12 md:space-y-0">
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-slate-300 py-2 pl-4 text-left md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4 md:text-center">
                <span className="text-sm font-medium text-green-600">
                  Step 1
                </span>
                <span className="text-xl font-semibold">
                  Sign up for an account
                </span>
                <span className="mt-2 text-slate-700">
                  Either starting out with a free plan or choose our{" "}
                  <Link
                    href="/pricing"
                    className="text-green-600 underline decoration-green-600 underline-offset-2"
                  >
                    pro plan
                  </Link>
                  .
                </span>
              </div>
            </li>

            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-slate-300 py-2 pl-4 text-left md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4 md:text-center">
                <span className="text-sm font-medium text-green-600">
                  Step 2
                </span>
                <span className="text-xl font-semibold">
                  Upload your PDF file
                </span>
                <span className="mt-2 text-slate-700">
                  We&apos;ll process your file make it ready for you to chat
                  with.
                </span>
              </div>
            </li>

            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-slate-300 py-2 pl-4 text-left md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4 md:text-center">
                <span className="text-sm font-medium text-green-600">
                  Step 3
                </span>
                <span className="text-xl font-semibold">
                  Start asking questions
                </span>
                <span className="mt-2 text-slate-700">
                  It&apos;s that simple. Try out doc.AI today - it really takes
                  less than a minute.
                </span>
              </div>
            </li>
          </ol>
          {/* hero2 section */}
        </div>
      </MaxWidthWrapper>
    </>
  );
}
