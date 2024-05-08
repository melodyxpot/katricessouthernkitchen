import React from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function CartEmpty() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      <ShoppingBagOutlinedIcon className="text-5xl" />
      <h3 className="text-xl font-bold">Your cart is empty</h3>
      <p className="text-xs text-gray-600">
        Add some products to see them here.
      </p>
    </div>
  );
}
