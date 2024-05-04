import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Download from "./_sections/download";
import Footer from "./_sections/footer";
import NavBar from "./_components/navs/navbar";
import Landing from "./_sections/landing";

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
        className={`${inter.className} flex min-h-screen flex-col items-center justify-between w-full`}
      >
        <NavBar />
        {/* <Landing /> */}
        {children}
        <Download />
        <Footer />
      </body>
    </html>
  );
}
