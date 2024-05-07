import Image from "next/image";
import React from "react";
import MainLink from "@/components/MainLink";

import ServiceImg from "@/assets/img/service_img.png";
import OrderImg from "@/assets/img/service-icons/order.png";
import ServiceHoursImg from "@/assets/img/service-icons/24hours.png";
import BookingImg from "@/assets/img/service-icons/booking.png";
import ServiceList from "../_components/service-list";
import SubTitle from "../_components/subtitle";
import Section from "../_components/section";

export default function Service() {
  return (
    <Section className="flex-col">
      <SubTitle>Our Services</SubTitle>
      <div className="grid gap-10 grid-cols-1 lg:grid-cols-2 justify-center">
        <Image src={ServiceImg} alt="service image" className="w-full" />
        <div className="flex flex-col gap-10 md:gap-5 xl:gap-10 xl:py-5">
          <p className="text-gray-800">
            We provides Lorem ipsum dolor sit amet consectetur. Ornare massa
            nunc nibh tristique. Non ligula tristique ut ut libero sit convallis
            maecenas. At egestas auctor porta mattis.
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
