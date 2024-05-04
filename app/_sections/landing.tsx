"use client";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";

import DownloadBanner from "@/assets/img/download_banner.png";
import ServiceImg from "@/assets/img/service_img.png";

export default function Landing() {
  return (
    <Carousel showArrows={true}>
      <Image src={DownloadBanner} alt="landing carousel image" />
      <Image src={ServiceImg} alt="landing carousel image" />
      <Image src={DownloadBanner} alt="landing carousel image" />
      <Image src={ServiceImg} alt="landing carousel image" />
    </Carousel>
  );
}
