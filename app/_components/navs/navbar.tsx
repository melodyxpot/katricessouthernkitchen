"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

import LogoImg from "@/assets/img/logo.png";

const NavLink = ({
  children,
  href,
  active = false
}: {
  children: ReactNode;
  href: string;
  active?: boolean;
}) => (
  <Link
    href={href}
    className={`${
      active ? "text-[#FC8019]" : ""
    } transition hover:text-[#FC8019]`}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const TOP_OFFSET = 50;
  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={`${
        showBackground ? "bg-black" : "bg-transparent"
      } w-full py-4 px-3 sm:px-20  text-white fixed left-0 text-center m-auto top-0 z-50`}
    >
      <nav className="max-w-[1440px] w-full flex justify-between items-center m-auto">
        <Link href={"/"} className="flex gap-2 h-14 w-52 font-semibold">
          <Image src={LogoImg} alt="Logo" />
          <p className="mt-1">Katrices Southern Kitchen</p>
        </Link>
        <ul className="gap-10 hidden sm:flex">
          <li>
            <NavLink href={"#"} active>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink href={"#"}>Orders</NavLink>
          </li>
          <li>
            <NavLink href={"#"}>About Us</NavLink>
          </li>
          <li>
            <NavLink href={"#"}>Contact Us</NavLink>
          </li>
          <li>
            <Link href={"#"} className="bg-[#FC8019] py-3 px-3 rounded-lg">
              Download App
            </Link>
          </li>
        </ul>
      </nav>
      {/* <HamburgerMenuPage /> */}
    </section>
  );
}
