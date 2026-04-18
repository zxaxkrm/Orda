"use client"

import { CartItem, useCartStore } from "@/store/cartStore";

const SquareSelector = ({item}:{item: CartItem}) => {
const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);


const increase = ()=> updateQuantity(item.id, item.quantity + 1);
const decrease = ()=> {
    if (item.quantity === 1) {
        removeItem(item.id)
    } else {
        updateQuantity(item.id, item.quantity - 1);
    }
}

  return (
    <div className="">
        

        <div className="flex items-center justify-between border w-25 h-6  px-2">
            <button className="text-xl font-light" onClick={decrease}>
                -
            </button>

            <span className=" font-medium">{item.quantity}</span>

            <button className="text-xl font-light" onClick={increase}>
                +
            </button>

        </div>
    </div>
  )}

export default SquareSelector;