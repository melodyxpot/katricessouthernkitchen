"use client";
import React, { useEffect, useState } from "react";
import Section from "../_components/section";
import SubTitle from "../_components/subtitle";
import Image from "next/image";
import AboutUsImage from "@/assets/img/service_img.png";
import { getPageSectionApi } from "@/server/strapi";

const STRAPI_CDN = process.env.NEXT_PUBLIC_STRAPI_API ?? "";

export default function Page() {
  const [about, setAbout] = useState<{ image: string; text: string }>({
    text: "",
    image: "",
  });
  useEffect(() => {
    getAbout();
  }, []);

  const getAbout = async () => {
    try {
      const { success, result } = await getPageSectionApi();
      const serviceResult = result.filter(
        (i: any) => i.attributes.page === "about"
      )[0];
      if (serviceResult) {
        const mediaUrl = serviceResult.attributes.image.data.attributes.url;
        setAbout({
          text: serviceResult.attributes.description ?? "",
          image: serviceResult.attributes.image.data.attributes.url.startsWith(
            "http"
          )
            ? serviceResult.attributes.image.data.attributes.url
            : STRAPI_CDN + mediaUrl,
        });
      }
    } catch (error) {
      // toast.error('Server Error');
      console.log("Server Error");
    }
  };

  return (
    <Section className="flex-col pt-32">
      <SubTitle className="text-left">About Us</SubTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        <Image
          width={800}
          height={800}
          src={about.image ? about.image : AboutUsImage}
          alt="about us"
        />
        <div className="flex flex-col justify-center">
          {about.text ? (
            about.text
          ) : (
            <>
              <p>
                Rich in family history all recipes were passed down from my
                Grandmother.
              </p>
              <p>She inspired my love of cooking for family and friends.</p>
              <p>
                We consider our customers family so your food is always made
                with the best ingredients and love. We provide great service and
                affordable prices for big or small events.
              </p>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
