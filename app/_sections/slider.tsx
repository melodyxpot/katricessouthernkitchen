"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import SliderBanner from "@/assets/img/slider.png";
import toast from "react-hot-toast";
import { getSliderImagesApi } from "@/server/strapi";

const STRAPI_CDN = process.env.NEXT_PUBLIC_STRAPI_API ?? '';


export const SliderComponent: React.FC<{
  title: string;
  src: StaticImageData | string;
}> = ({ title, src }) => (
  <div className="relative h-[100vh]">
    <div className="bg-black bg-opacity-80 flex justify-center items-center absolute w-full h-full top-0 left-0">
      <h1 className="text-white text-5xl">{title}</h1>
    </div>
    <img
      // width={1000}
      // height={1000}
      // src={src}
      src={src as string}
      alt={title}
      className="h-[100vh] w-auto object-cover"
    />
  </div>
);

export default function Slider() {
  const [sliders, setSliders] = useState<{image: string; title: string}[]>([]);
  useEffect(() => {
    getSlideImages();
  }, []);
  console.log(sliders)

  const getSlideImages = async () => {
    try {
      const { success, result }= await getSliderImagesApi();
      console.log(result)
      setSliders(result.map((item: any) => ({ title: item.attributes.title, image: `${item.attributes.image.data[0].attributes.url.startsWith('http') ? item.attributes.image.data[0].attributes.url : STRAPI_CDN + item.attributes.image.data[0].attributes.url}`})))
    } catch (error) {
      toast.error('Server Error')
    }
  }

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
      {sliders.map((slider, i) => <SliderComponent
        key={`slider-${i}`}
        title={slider.title}
        src={slider.image}
      />)}
      {/* <SliderComponent
        title="Welcome To Katrices Southern Kitchen"
        src={SliderBanner}
      />
      <SliderComponent title="Order Your Favorite Food" src={SliderBanner} />
      <SliderComponent title="About Us" src={SliderBanner} /> */}
    </Carousel>
  );
}
