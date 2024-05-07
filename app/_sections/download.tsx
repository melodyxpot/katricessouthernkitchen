import AppDownload from "@/components/AppDownload";
import Image from "next/image";
import React from "react";
import GooglePlayIcon from "@/components/Icons/GooglePlayIcon";
import AppleIcon from "@/components/Icons/AppleIcon";

import DownloadImage from "@/assets/img/download_banner.png";

export default function Download() {
  return (
    <div className="bg-[#FFF3E5] w-full flex justify-center py-16">
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 max-w-[1440px] w-full sm:px-20 px-3">
        <div className="flex flex-col gap-5">
          <h3 className="text-[#396C03] font-bold text-3xl">
            It’s Easier To Order By Mobile App
          </h3>
          <p className="text-gray-800">
            Download our app from google play or app store and you don’t have to
            be worry about your food anymore.{" "}
          </p>
          <div className="flex flex-col lg:flex-row gap-3">
            <AppDownload link="#">
              <AppleIcon />
              <div>
                <i className="not-italic text-xs">Download on the</i>
                <h5 className="text-xl">App Store</h5>
              </div>
            </AppDownload>
            <AppDownload link="#">
              <GooglePlayIcon />
              <div>
                <i className="not-italic text-xs">GET IT ON</i>
                <h5 className="text-xl">Google Play</h5>
              </div>
            </AppDownload>
          </div>
        </div>
        <div className="w-full">
          <Image src={DownloadImage} alt="download banner" className="w-full" />
        </div>
      </div>
    </div>
  );
}
