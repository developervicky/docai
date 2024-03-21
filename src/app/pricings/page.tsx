import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PLANS } from "@/config/stripe";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import UpgradeButton from "@/components/UpgradeButton";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const pricingItems = [
    {
      plan: "Free",
      tagline: "For small side projects.",
      quota: 10,
      features: [
        {
          text: "5 pages per PDF",
          footnote: "The maximum amount of pages per PDF-file.",
        },
        {
          text: "4MB file size limit",
          footnote: "The maximum file size of a single PDF file.",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Higher-quality responses",
          footnote: "Better algorithmic responses for enhanced content quality",
          negative: true,
        },
        {
          text: "Priority support",
          negative: true,
        },
      ],
    },
    {
      plan: "Pro",
      tagline: "For larger projects with higher needs.",
      quota: PLANS.find((p) => p.slug === "pro")!.quota,
      features: [
        {
          text: "50 pages per PDF",
          footnote: "The maximum amount of pages per PDF-file.",
        },
        {
          text: "16MB file size limit",
          footnote: "The maximum file size of a single PDF file.",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Higher-quality responses",
          footnote: "Better algorithmic responses for enhanced content quality",
        },
        {
          text: "Priority support",
        },
      ],
    },
  ];

  return (
    <>
      <MaxWidthWrapper className="mb-8 mt-24 max-w-7xl text-center">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <h1 className="text-6xl font-bold sm:text-7xl">Pricing</h1>
          <p className="mt-5 text-slate-600 sm:text-lg">
            To enable more features, try upgrading your plan!
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 pt-12 lg:grid-cols-2">
          <TooltipProvider>
            {pricingItems.map(({ plan, tagline, quota, features }) => {
              const price =
                PLANS.find((p) => p.slug === plan.toLowerCase())?.price
                  .amount || 0;

              return (
                <div
                  key={plan}
                  className={cn(`relative rounded-2xl bg-white shadow-lg`, {
                    "border-2 border-primary shadow-green-200": plan === "Pro",
                    "border border-slate-200": plan !== "Pro",
                  })}
                >
                  {plan === "Pro" && (
                    <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-lime-600 to-green-600 px-3 py-2 text-sm font-bold text-white">
                      Upgrade now
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="font-display my-3 text-center text-3xl font-bold">
                      {plan}
                    </h3>
                    <p className="text-slate-500">{tagline}</p>
                    <p className="my-5 text-6xl font-semibold">
                      &#8377;{price}
                    </p>
                    <p className="text-slate-500">per month</p>
                  </div>
                  <div className="flex h-20 items-center justify-center border-b border-t border-slate-200 bg-slate-50">
                    <div className="flex items-center space-x-1">
                      <p>{quota.toLocaleString()} PDFs/month included</p>

                      <Tooltip delayDuration={300}>
                        <TooltipTrigger className="ml-1.5 cursor-default">
                          <HelpCircle className="h-4 w-4 text-primary" />
                        </TooltipTrigger>
                        <TooltipContent className="w-80 p-2">
                          How many PDFs you can upload per month.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <ul className="my-10 space-y-5 px-8">
                    {features.map(({ text, footnote, negative }) => (
                      <li key={text} className="flex space-x-5">
                        <div className="flex-shrink-0">
                          {negative ? (
                            <Minus className="h-6 w-6 text-slate-300" />
                          ) : (
                            <Check className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        {footnote ? (
                          <div className="flex items-center space-x-1">
                            <p
                              className={cn("text-slate-400", {
                                "text-slate-600": negative,
                              })}
                            >
                              {text}
                            </p>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger className="ml-1.5 cursor-default">
                                <HelpCircle className="h-4 w-4 text-primary" />
                              </TooltipTrigger>
                              <TooltipContent className="w-80 p-2">
                                {footnote}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <p
                            className={cn("text-slate-600", {
                              "text-slate-400": negative,
                            })}
                          >
                            {text}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-slate-200" />
                  <div className="p-5">
                    {plan === "Free" ? (
                      <Link
                        href={user ? "/dashboard" : "/sign-up"}
                        className={buttonVariants({
                          className: "group w-full ",
                          variant: "secondary",
                        })}
                      >
                        {user ? "Use now" : "Sign up"}{" "}
                        <ArrowRight className="ml-1.5 h-5 w-5 transition-all group-hover:translate-x-1 group-hover:scale-105" />
                      </Link>
                    ) : user ? (
                      <UpgradeButton />
                    ) : (
                      <Link
                        href="/sign-up"
                        className={buttonVariants({
                          className: "group w-full",
                        })}
                      >
                        {user ? "Upgrade now" : "Sign up"}{" "}
                        <ArrowRight className="ml-1.5 h-5 w-5 transition-all group-hover:translate-x-1 group-hover:scale-105" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
