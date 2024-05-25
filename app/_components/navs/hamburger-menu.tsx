"use client";
import React, { ReactNode, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

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
    </div>
  );
}
