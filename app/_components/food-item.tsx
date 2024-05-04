import TopRightArrowIcon from "@/components/Icons/TopRightArrowIcon";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

export default function FoodItem({ image }: { image: StaticImageData }) {
  return (
    <div className="cursor-pointer relative rounded-lg">
      <div className="hover:opacity-50 flex justify-center bg-black absolute w-full h-full top-0 left-0 opacity-0 transition rounded-lg">
        <Link
          href={"#"}
          className="text-white flex justify-center items-center gap-1"
        >
          LoremIpsum text <TopRightArrowIcon />
        </Link>
      </div>
      <Image src={image} alt="Foot Item" />
    </div>
  );
}
