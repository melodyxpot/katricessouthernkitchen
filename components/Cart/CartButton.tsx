"use client";
import React, { useCallback, useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Drawer from "@/components/Drawer";
import useLocalStorage from "@/hooks/useLocalStorage";
import { checkoutWithStripe } from "@/utils/stripe/server";
import CartItem from "./CartItem";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CartEmpty from "./CartEmpty";
import { clsx } from "clsx";
import { getProductsApi } from "@/server/strapi";
import toast from "react-hot-toast";

export default function CartButton() {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useLocalStorage<CartProduct[]>("cart", []);
  const [purchaseId, setPurchaseId] = useLocalStorage<string>("purchaseId", "");
  const [totalCost, setTotalCost] = useState<number>(0);
  /**
   * Fetch products
   */
  const getProducts = useCallback(async () => {
    try {
      const res = await getProductsApi();
      if (res.success) {
        const { result } = res;
        const cartItems = localStorage.getItem("cart");
        if (cartItems) {
          setCart(
            JSON.parse(cartItems)
              .filter((item: CartProduct) =>
                result.find((i: Product) => i.id === item.id)
              )
              .map((item: CartProduct) => {
                const productItem = result.find(
                  (i: Product) => i.id === item.id
                );

                return {
                  id: productItem.id,
                  quantity: item?.quantity ?? 0,
                  name: productItem.attributes.name,
                  priceId: productItem.attributes.priceId,
                  price: productItem.attributes.price
                };
              })
          );
        }
      } else {
        console.error(res.error);
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("--- getProducts ---", error);
      toast.error("Server Error");
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    let total = 0;
    cart.forEach((c) => (total += c.price * c.quantity));
    setTotalCost(total);
  }, [cart]);

  const purchaseCartItems = async () => {
    const resultString = await checkoutWithStripe(cart);
    const result = JSON.parse(resultString);

    if (result.session && result.session.url) {
      setPurchaseId(result.purchaseId);
      location.href = result.session.url;
    }
  };

  return (
    <>
      <button
        className="fixed bottom-10 right-10 bg-primary rounded-full p-4 text-white"
        onClick={() => setCartOpen(true)}
      >
        {cart.length !== 0 && (
          <div className="relative">
            <p className="absolute -top-5 -right-5 bg-red-600 rounded-full w-6 h-6 text-xs p-1">
              {cart.length}
            </p>
          </div>
        )}
        <ShoppingCartOutlinedIcon />
      </button>
      <Drawer
        open={cartOpen}
        setOpen={setCartOpen}
        side="right"
        header={
          <div className="flex gap-3 text-black text-lg items-center font-bold">
            <ShoppingCartOutlinedIcon
              className="text-primary"
              fontSize="large"
            />
            Cart
          </div>
        }
        footer={
          <div className="flex flex-col gap-1 w-full">
            <div className="w-full flex justify-between">
              <p>Total</p>
              <p>${totalCost}</p>
            </div>
            <button
              className={clsx(
                "text-white p-3 rounded-md w-full transition flex gap-3 items-center justify-center",
                { "bg-gray-500": cart.length === 0 || !cart },
                { "bg-primary hover:bg-primary-100": cart.length !== 0 && cart }
              )}
              onClick={purchaseCartItems}
              disabled={cart.length === 0 || !cart}
            >
              <CreditCardIcon htmlColor="#ffffff" /> Process Payment
            </button>
          </div>
        }
      >
        <div className="px-5 flex flex-col gap-3 h-full">
          {cart && cart.length !== 0 ? (
            cart.map((product) => (
              <CartItem key={product.priceId} product={product} />
            ))
          ) : (
            <CartEmpty />
          )}
        </div>
      </Drawer>
    </>
  );
}
