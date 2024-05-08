import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Download from "./_sections/download";
import Footer from "./_sections/footer";
import NavBar from "./_components/navs/navbar";
import Slider from "./_sections/slider";
import CartButton from "../components/Cart/CartButton";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Katrices Southern Kitchen",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex relative min-h-screen flex-col items-center justify-between w-full`}
      >
        <Toaster />

        <NavBar />
        <Slider />
        {children}
        <Download />
        <Footer />
        <CartButton />
      </body>
    </html>
  );
}
