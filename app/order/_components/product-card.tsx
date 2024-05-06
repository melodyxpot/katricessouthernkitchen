"use client";
import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { checkoutWithStripe } from "@/utils/stripe/server";

interface Props {
  price: number;
  name: string;
  desc?: string;
}

export default function ProductCard({ price, name, desc }: Props) {
  const handleSubscription = async () => {
    const result = await checkoutWithStripe();
    if (result.session && result.session.url) {
      location.href = result.session.url;
    }
  };

  return (
    <div className="shadow-md rounded-lg p-5">
      <p className="text-primary font-semibold">${price}</p>
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-xs text-gray-400">{desc}</p>
      <div className="border border-b-primary my-3" />
      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
        <button className="rounded-lg py-2 px-2 text-primary bg-primary bg-opacity-20 items-center flex justify-center">
          <BookmarkBorderOutlinedIcon fontSize="small" />
          Save for later
        </button>
        <button
          className="rounded-lg py-2 px-2 bg-primary text-white items-center flex justify-center"
          onClick={handleSubscription}
        >
          <ShoppingCartOutlinedIcon fontSize="small" />
          Add to cart
        </button>
      </div>
    </div>
  );
}
