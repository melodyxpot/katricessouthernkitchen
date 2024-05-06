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

export default function Footer() {
  return (
    <footer className="pt-32 max-w-[1440px] w-full px-3 sm:px-20 pb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-5 md:gap-10 mb-11">
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 justify-center sm:justify-start items-center">
            <Image src={Logo} alt="logo" />
            <h3 className="font-bold text-center sm:text-left">
              Katrices Southern Kitchen
            </h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor{" "}
          </p>
          <div className="flex gap-3 justify-center sm:justify-start">
            <Link href={"#"}>
              <FacebookIcon />
            </Link>
            <Link href={"#"}>
              <InstagramIcon />
            </Link>
            <Link href={"#"}>
              <XIcon />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h3 className="font-bold text-center sm:text-left">CONTACT US</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link
                href={"#"}
                className="flex gap-1 hover:underline justify-center sm:justify-start"
              >
                <CallIcon /> <p>773 355 8503</p>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex gap-1 hover:underline justify-center sm:justify-start"
              >
                <MailIcon /> <p>info@katrices.southern.kitchen@gmail.com</p>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex gap-1 hover:underline justify-center sm:justify-start"
              >
                <FacebookRoundedIcon /> <p>Katrices Southern Kitchen</p>
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="flex gap-1 hover:underline justify-center sm:justify-start"
              >
                <InstagramIcon /> <p>@katricessouthernkitchen</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-8 col-span-1 sm:col-span-2 lg:col-span-1">
          <h3 className="font-bold text-center sm:text-left">SITEMAP</h3>
          <ul className="flex flex-row sm:flex-col gap-3 text-sm justify-center">
            <li>
              <Link href={"#"} className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href={"#"} className="hover:underline">
                Orders
              </Link>
            </li>
            <li>
              <Link href={"#"} className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href={"#"} className="hover:underline">
                Contact US
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center">Copyright © 2024 Katrices Southern Kitchen.</p>
    </footer>
  );
}
