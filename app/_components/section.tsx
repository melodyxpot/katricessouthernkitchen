import React, { ReactNode } from "react";

export default function Section({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`w-full flex justify-center py-16 px-3 sm:px-20 max-w-[1440px] ${className}`}
    >
      {children}
    </section>
  );
}
