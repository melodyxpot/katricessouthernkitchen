import Link from "next/link";
import React, { ReactNode } from "react";

export default function AppDownload({
  link,
  children
}: {
  link: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={link}
      className="flex gap-2 w-52 px-5 py-2 bg-black items-center rounded-lg text-white"
    >
      {children}
    </Link>
  );
}
