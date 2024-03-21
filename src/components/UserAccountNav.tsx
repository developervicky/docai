import { getUserSubscriptionPlan } from "@/lib/stripe";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { Icons } from "./chat/Icons";
import Link from "next/link";
import { Gem } from "lucide-react";

interface UserAccountNav {
  email: string | undefined;
  imageUrl?: string;
  name: string;
}

const UserAccountNav = async ({ email, imageUrl, name }: UserAccountNav) => {
  const subscriptionPlan = await getUserSubscriptionPlan();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button className="aspect-square h-8 w-8 rounded-full bg-slate-400">
          <Avatar className="group relative h-8 w-8 ">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full transition-transform group-hover:scale-105">
                <Image
                  fill
                  src={imageUrl}
                  alt="dp"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className="sr-only">{name}</span>
                <Icons.user className="h-4 w-4 text-primary transition-transform group-hover:scale-105" />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2 ">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="text-sm font-medium text-black">{name}</p>}
            {email && (
              <p className="w-[300px] text-xs text-slate-700">{email}</p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          {subscriptionPlan.isSubscribed ? (
            <Link href="/dashboard/billing">Manage Subscription</Link>
          ) : (
            <Link href="/pricings">
              Upgrade <Gem className="ml-1.5 h-4 w-4 text-primary" />
            </Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
