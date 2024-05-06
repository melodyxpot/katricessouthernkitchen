import Link from "next/link";
import React, { ReactNode } from "react";
import ArrowRightIcon from "./Icons/ArrowRightIcon";

interface Props {
  children: ReactNode;
  href: string;
}

export default function MainLink({ children, href }: Props) {
  return (
    <Link
      href={href}
      className="flex justify-center gap-2 items-center py-3 text-center px-4 bg-primary rounded-full text-white w-full sm:w-40"
    >
      {children}
      <ArrowRightIcon />
    </Link>
  );
}
