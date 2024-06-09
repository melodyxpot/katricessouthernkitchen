"use client";
import { useSearchParams } from "next/navigation";
import Explore from "./_sections/explore";
import Order from "./_sections/order";
import Service from "./_sections/service";
import Slider from "./_sections/slider";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getJwtVerifiedPayload } from "@/utils/helpers";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Home() {
  const searchParams = useSearchParams();
  const [cart, setCart] = useLocalStorage<CartProduct[]>("cart", []);
  const [purchaseId, setPurchaseId] = useLocalStorage<string>("purchaseId", "");
  

  useEffect(() => {
    const checkout = searchParams.get("checkout");
    const status = searchParams.get("status");
    if (checkout && purchaseId) {
      const getPayload = async () => {
        const { payload, success } = await getJwtVerifiedPayload(checkout);
        if (success && payload) {
          if (status === "success" && purchaseId === payload.id) {
            toast.success("Payment successful");
            setCart([]);
            setPurchaseId("");
          } else if (status === "cancel") {
            toast.error("Payment canceled");
          }
        }
      }
      getPayload();
    }
  }, [searchParams, purchaseId]);

  return (
    <>
      <Slider />
      {/* <Order /> */}
      {/* <Explore /> */}
      <Service />
    </>
  );
}
