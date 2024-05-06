"use client";
import React, { ReactNode, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import Link from "next/link";

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
export default function HamburgerMenu() {
  const [navToggle, setNavToggle] = useState<boolean>(false);

  return (
    <div className="text-white">
      <button
        className="cursor-pointer transition"
        onClick={() => setNavToggle(!navToggle)}
      >
        {navToggle ? (
          <ClearIcon fontSize="large" />
        ) : (
          <MenuIcon fontSize="large" />
        )}
      </button>
      <ul
        className={`${
          navToggle ? "flex flex-col h-auto" : "hidden h-0"
        } text-sm  transition absolute justify-center py-5 gap-10 left-0 top-full bg-black w-full px-4 transition-height ease duration-300`}
      >
        <li>
          <NavLink href={"#"} active>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink href={"/order"}>Orders</NavLink>
        </li>
        <li>
          <NavLink href={"#"}>About Us</NavLink>
        </li>
        <li>
          <NavLink href={"#"}>Contact Us</NavLink>
        </li>
        <li>
          <Link href={"#"} className="bg-primary py-3 px-3 rounded-lg">
            Download App
          </Link>
        </li>
      </ul>
    </div>
  );
}
