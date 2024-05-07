"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import SliderBanner from "@/assets/img/slider.png";

export const SliderComponent: React.FC<{
  title: string;
  src: StaticImageData;
}> = ({ title, src }) => (
  <div className="relative h-[100vh]">
    <div className="bg-black bg-opacity-80 flex justify-center items-center absolute w-full h-full top-0 left-0">
      <h1 className="text-white text-5xl">{title}</h1>
    </div>
    <Image
      src={src}
      alt="landing carousel image"
      className="h-[100vh] w-auto object-cover"
    />
  </div>
);

export default function Slider() {
  return (
    <Carousel
      showArrows={true}
      className="v-[100vh] select-none"
      autoPlay
      showThumbs={false}
      showStatus={false}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={50}
    >
      <SliderComponent
        title="Welcome To Katrices Southern Kitchen"
        src={SliderBanner}
      />
      <SliderComponent title="Order Your Favorite Food" src={SliderBanner} />
      <SliderComponent title="About Us" src={SliderBanner} />
    </Carousel>
  );
}
