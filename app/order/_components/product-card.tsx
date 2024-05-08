"use client";
import React from "react";
import AddShoppingCartOutlined from "@mui/icons-material/AddShoppingCartOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const [cart, setCart] = useLocalStorage<CartProduct[]>("cart", []);
  const handleAddToCart = async () => {
    if (cart.map((p) => p.priceId).indexOf(product.priceId) !== -1) {
      toast.error("Product is already in your cart.");
      return;
    }
    setCart([...cart, { ...product, quantity: 1 }]);
    toast.success("Added product in your cart.");
  };

  return (
    <div className="shadow-md rounded-lg p-5">
      <p className="text-primary font-semibold">${product.price}</p>
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-xs text-gray-400">{product.desc}</p>
      <div className="border border-b-primary my-3" />
      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
        <button className="rounded-lg py-2 px-2 text-primary bg-primary bg-opacity-20 items-center flex justify-center">
          <BookmarkBorderOutlinedIcon fontSize="small" />
          Save for later
        </button>
        <button
          className="rounded-lg py-2 px-2 bg-primary text-white items-center flex justify-center transition"
          onClick={handleAddToCart}
        >
          <AddShoppingCartOutlined fontSize="small" />
          Add to cart
        </button>
      </div>
    </div>
  );
}
