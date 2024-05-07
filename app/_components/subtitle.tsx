import React, { ReactNode } from "react";

export default function SubTitle({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`${className} text-center mb-9 text-2xl sm:text-3xl md:text-4xl font-bold`}
    >
      {children}
    </h2>
  );
}
