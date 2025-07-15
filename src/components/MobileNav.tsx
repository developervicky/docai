"use client";

import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface MobileNavProps {
  isAuth: boolean;
}

const MobileNav = ({ isAuth }: MobileNavProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname, isOpen]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };

  return (
    <div className="sm:hidden">
      <Menu
        onClick={toggleOpen}
        className="relative z-50 h-5 w-5 text-slate-700"
      />

      {isOpen ? (
        <div className="fixed inset-0 z-0 w-full animate-in fade-in-20 slide-in-from-top-5">
          <ul className="absolute grid w-full gap-3 border-b border-slate-200 bg-white px-10 pb-8 pt-20 shadow-xl">
            {!isAuth ? (
              <>
                <li>
                  <RegisterLink
                    onClick={() => toggleOpen()}
                    className="flex w-full items-center font-semibold text-primary"
                  >
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </RegisterLink>
                </li>
                <li className="my-3 h-px w-full bg-slate-300" />
                <li>
                  <LoginLink
                    onClick={() => toggleOpen()}
                    className="flex w-full items-center font-semibold"
                  >
                    Sign in
                  </LoginLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/dashboard")}
                    className="flex w-full items-center font-semibold"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-slate-300" />
                <li>
                  <LogoutLink className="flex w-full items-center font-semibold">
                    Sign out
                  </LogoutLink>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
