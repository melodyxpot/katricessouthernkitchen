"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

import LogoImg from "@/assets/img/logo.png";
import HamburgerMenu from "./hamburger-menu";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

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
    className={`${active ? "text-primary" : ""} transition hover:text-primary`}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const TOP_OFFSET = 50;
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/about') {
      setShowBackground(true)
    }

    const handleScroll = () => {
      if (pathname !== '/about') {
        if (window.scrollY >= TOP_OFFSET) {
          setShowBackground(true);
        } else {
          setShowBackground(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <section
      className={`${
        showBackground ? "bg-black" : "bg-black sm:bg-transparent"
      } w-full transition duration-100 py-4 px-3 lg:px-20 text-white fixed left-0 text-center m-auto top-0 z-10`}
    >
      <nav className="max-w-[1440px] w-full flex justify-between items-center m-auto">
        <Link
          href={"/"}
          className="flex h-14 gap-2 w-52 font-semibold items-center"
        >
          <Image src={LogoImg} width={50} height={50} alt="Logo" />
          <p className="mt-1 text-sm text-start">Katrices Southern Kitchen</p>
        </Link>
        <ul className="gap-3 md:gap-10 text-sm hidden sm:flex">
          <li>
            <NavLink href={"/"} active={pathname === "/"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink href={"/order"} active={pathname === "/order"}>
              Order
            </NavLink>
          </li>
          <li>
            <NavLink href={"/about"}>About Us</NavLink>
          </li>
          <li>
            <Link
              href={"#"}
              className="bg-primary py-3 px-3 rounded-lg hover:bg-primary-100 transition"
              onClick={() => toast("Coming soon!")}
            >
              Download App
            </Link>
          </li>
        </ul>
        <div className="flex sm:hidden items-center">
          <HamburgerMenu />
        </div>
      </nav>
    </section>
  );
}
