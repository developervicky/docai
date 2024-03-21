"use client";

import { trpc } from "@/app/_trpc/client";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const UpgradeButton = () => {
  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? "/dashboard/billing";
    },
  });
  return (
    <Button onClick={() => createStripeSession()} className="group w-full">
      Upgrade now{" "}
      <ArrowRight className="ml-1.5 h-5 w-5 transition-all group-hover:translate-x-1 group-hover:scale-105" />
    </Button>
  );
};

export default UpgradeButton;
