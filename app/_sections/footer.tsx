"use client";
import Image from "next/image";
import React from "react";

import Logo from "@/assets/img/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import Link from "next/link";
import { socials } from "@/constants";

export default function Footer() {
  return (
    <footer className="pt-32 max-w-[1440px] w-full px-3 sm:px-20 pb-5 flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-5 md:gap-10 mb-11">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <div className="flex gap-3 justify-center sm:justify-start items-center">
            <Image src={Logo} width={50} height={50} alt="logo" />
            <h3 className="font-bold text-center sm:text-left">
              Katrices Southern Kitchen
            </h3>
          </div>
          <p className="text-center sm:text-left text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor{" "}
          </p>
          <div className="flex gap-3 justify-center sm:justify-start">
            <Link href={socials.facebook.link}>
              <FacebookIcon />
            </Link>
            <Link
              href={socials.instagram.link}
            >
              <InstagramIcon />
            </Link>
            <Link href={socials.x.link}>
              <XIcon />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:col-span-2">
          <h3 className="font-bold text-center sm:text-left">CONTACT US</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-700">
            <li>
              <Link
                href={socials.phone.link}
                className="flex gap-1 hover:underline justify-center sm:justify-start"
              >
                <CallIcon /> <p>{socials.phone.text}</p>
              </Link>
            </li>
            <li>
              <Link
                href={socials.email.link}
                className="flex gap-1 hover:underline justify-center sm:justify-start"
              >
                <MailIcon /> <p>{socials.email.text}</p>
              </Link>
            </li>
            <li>
              <Link
                href={socials.facebook.link}
                className="flex gap-1 hover:underline justify-center sm:justify-start"
              >
                <FacebookRoundedIcon /> <p>{socials.facebook.text}</p>
              </Link>
            </li>
            <li>
              <Link
                href={socials.instagram.link}
                className="flex gap-1 hover:underline justify-center sm:justify-start"
              >
                <InstagramIcon /> <p>{socials.instagram.text}</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-8 col-span-1 sm:col-span-2 lg:col-span-1">
          <h3 className="font-bold text-center sm:text-left">SITEMAP</h3>
          <ul className="flex flex-row sm:flex-col gap-3 text-sm justify-center text-gray-700">
            <li>
              <Link href={"/"} className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href={"/order"} className="hover:underline">
                Order
              </Link>
            </li>
            <li>
              <Link href={"/about"} className="hover:underline">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500">
        Copyright © 2024 Katrices Southern Kitchen.
      </p>
    </footer>
  );
}
