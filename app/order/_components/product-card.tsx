"use client";
import React from "react";
import AddShoppingCartOutlined from "@mui/icons-material/AddShoppingCartOutlined";
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const [cart, setCart] = useLocalStorage<CartProduct[]>("cart", []);
  const handleAddToCart = async () => {
    if (cart.map((p) => p.id).indexOf(product.id) !== -1) {
      toast.error("Product is already in your cart.");
      return;
    }
    setCart([
      ...cart,
      {
        name: product.name,
        quantity: 1,
        price: product.price,
        priceId: product.priceId,
        id: product.id
      }
    ]);
    toast.success("Added product in your cart.");
  };

  return (
    <div className="shadow-md rounded-lg p-5 flex flex-col gap-1">
      <p className="text-primary font-semibold">${product.price}</p>
      <h3 className="text-lg font-bold text-center w-full">{product.name}</h3>
      <p className="text-xs text-gray-400">{product.description}</p>
      <div className="border border-b-primary my-3" />
      <div className="flex text-xs">
        <button
          className="rounded-lg py-2 px-2 bg-primary text-white items-center flex justify-center transition w-full hover:bg-primary-100"
          onClick={handleAddToCart}
        >
          <AddShoppingCartOutlined fontSize="small" />
          Add to cart
        </button>
      </div>
    </div>
  );
}
