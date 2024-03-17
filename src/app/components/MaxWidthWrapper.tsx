import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}
const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        " mx-auto w-full max-w-screen-2xl px-2.5 sm:px-4 md:px-8 ",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
