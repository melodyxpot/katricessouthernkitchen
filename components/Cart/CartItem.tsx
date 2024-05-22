import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useLocalStorage from "@/hooks/useLocalStorage";

interface CartItemProduct extends CartProduct {}

export default function CartItem({ product }: { product: CartItemProduct }) {
  const [cart, setCart] = useLocalStorage<CartProduct[]>("cart", []);

  const handleQuantityIncrease = () => {
    setCart(
      cart.map((p) => {
        if (p.id === product.id) {
          p.quantity += 1;
        }
        return p;
      })
    );
  };

  const handleQuantityDecrease = () => {
    if (product.quantity === 1) {
      return;
    }
    setCart(
      cart.map((p) => {
        if (p.id === product.id) {
          p.quantity -= 1;
        }
        return p;
      })
    );
  };

  const handleRemoveProduct = () => {
    setCart(cart.filter((p) => p.id !== product.id));
  };

  return (
    <div className="bg-[#F8F8F8] rounded-xl py-3 px-3 md:px-5 flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div>
          <p className="text-sm md:text-md">{product.name}</p>
          <p className="text-primary text-xs md:text-sm">${product.price}</p>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-1">
          <button
            className="bg-slate-200 hover:text-white text-slate-800 transition hover:bg-primary rounded-r-none rounded-md h-8 items-center flex px-1"
            onClick={handleQuantityDecrease}
          >
            <RemoveIcon />
          </button>
          <p className="bg-slate-200 text-slate-800 hover:text-slate-800 w-10 text-center h-8 items-center flex justify-center text-xs">
            {product.quantity}
          </p>
          <button
            className="bg-slate-200 hover:text-white text-slate-800 transition hover:bg-primary rounded-l-none rounded-md h-8 items-center flex px-1"
            onClick={handleQuantityIncrease}
          >
            <AddIcon />
          </button>
        </div>
        <p className="text-primary text-xs">
          ${product.quantity * product.price}
        </p>
        <button
          className="cursor-pointer flex items-center"
          onClick={handleRemoveProduct}
        >
          <DeleteIcon htmlColor="#FF7979" />
        </button>
      </div>
    </div>
  );
}
