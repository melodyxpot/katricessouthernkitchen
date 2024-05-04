import Image from "next/image";
import React from "react";
import MainLink from "@/components/MainLink";

import ServiceImg from "@/assets/img/service_img.png";
import SubTitle from "../_components/subtitle";
import Section from "../_components/section";

export default function Order() {
  return (
    <Section>
      <div className="grid gap-10 grid-cols-1 lg:grid-cols-2 justify-center">
        <div className="flex flex-col gap-10 md:gap-5 xl:gap-10 xl:py-5">
          <SubTitle className="text-left">Explore Your Favorite Food</SubTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur. Ornare massa nunc nibh
            tristique. Non ligula tristique ut ut libero sit convallis maecenas.
            At egestas auctor porta mattis.
          </p>
          <MainLink href="#">Order Now</MainLink>
        </div>
        <Image src={ServiceImg} alt="service image" className="w-full" />
      </div>
    </Section>
  );
}
