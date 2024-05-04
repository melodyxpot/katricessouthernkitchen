import Image, { StaticImageData } from "next/image";
import React from "react";

interface Props {
  icon: StaticImageData;
  text: string;
}

export default function ServiceList({ icon, text }: Props) {
  return (
    <div className="flex gap-2 mb-3 md:mb-1 xl:mb-3">
      <Image src={icon} alt="service icon" className="w-5 h-5" />
      <p className="font-semibold text-xs sm:text-sm">{text}</p>
    </div>
  );
}
