"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MainLink from "@/components/MainLink";

import ServiceImg from "@/assets/img/service_img.png";
import OrderImg from "@/assets/img/service-icons/order.png";
import ServiceHoursImg from "@/assets/img/service-icons/24hours.png";
import BookingImg from "@/assets/img/service-icons/booking.png";
import ServiceList from "../_components/service-list";
import SubTitle from "../_components/subtitle";
import Section from "../_components/section";
import { getServiceApi } from "@/server/strapi";
import toast from "react-hot-toast";

const STRAPI_CDN = process.env.NEXT_PUBLIC_STRAPI_API ?? '';

export default function Service() {
  const [service, setService] = useState<{image: string; text: string}>({
    text: '',
    image: ''
  });

  useEffect(() => {
    getService();
  }, [])
  const getService = async () => {
    try {
      const { success, result }= await getServiceApi();
      setService({ text: result[0].attributes.description ?? '', image: result[0].attributes.image.data.attributes.url.startsWith('http') ? result[0].attributes.image.data.attributes.url : STRAPI_CDN + result[0].attributes.image.data.attributes.url })
    } catch (error) {
      toast.error('Server Error');
    }
  }

  return (
    <Section className="flex-col">
      <SubTitle>Our Services</SubTitle>
      <div className="grid gap-10 grid-cols-1 lg:grid-cols-2 justify-center">
        <Image src={service.image ? service.image : ServiceImg} width={500} height={500} alt="service image" className="w-full rounded-md" />
        <div className="flex flex-col gap-10 md:gap-5 xl:gap-10 xl:py-5">
          <p className="text-gray-800">
            {service.text ? service.text : `We provides Lorem ipsum dolor sit amet consectetur. Ornare massa
            nunc nibh tristique. Non ligula tristique ut ut libero sit convallis
            maecenas. At egestas auctor porta mattis.`}
          </p>
          <div className="flex gap-5 sm:gap-10">
            <div>
              <ServiceList icon={OrderImg} text="Online Order" />
              <ServiceList icon={BookingImg} text="Pre-Reservation" />
              <ServiceList icon={BookingImg} text="Super Chef" />
            </div>
            <div>
              <ServiceList icon={ServiceHoursImg} text="24/7 Service" />
              <ServiceList icon={BookingImg} text="Oragonized Foodhut Place" />
              <ServiceList icon={BookingImg} text="Clean Kitchen" />
            </div>
          </div>
          <MainLink href="#">About Us</MainLink>
        </div>
      </div>
    </Section>
  );
}
