import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-slate-200 bg-slate-100/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-slate-200 ">
          <Link href="/" className="z-40">
            <Image
              src="/logo.svg"
              alt="logo"
              width={100}
              height={100}
              className="ml-2 mt-1.5 object-cover"
            />
          </Link>
          {/* {todo:mobilenav} */}

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  href="/pricings"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className:
                      "transition-all hover:!bg-green-100  hover:outline hover:outline-1 hover:outline-green-600/20 ",
                  })}
                >
                  Pricing
                </Link>
                {/* signin & register */}

                <LoginLink
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className:
                      "transition-all hover:!bg-green-100  hover:outline hover:outline-1 hover:outline-green-600/20 ",
                  })}
                >
                  Sign in
                </LoginLink>

                <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                    className:
                      "group transition-transform  hover:!bg-green-600/90 ",
                  })}
                >
                  Sign up
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5" />
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className:
                      "transition-all hover:!bg-green-100  hover:outline hover:outline-1 hover:outline-green-600/20 ",
                  })}
                >
                  Dashboard
                </Link>
                <UserAccountNav />
              </>
            )}

            {/* logout */}
            <LogoutLink
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className:
                  "transition-all hover:!bg-green-100  hover:outline hover:outline-1 hover:outline-green-600/20 ",
              })}
            >
              Logout
            </LogoutLink>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
