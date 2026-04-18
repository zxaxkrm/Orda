"use client";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import SquareSelector from "./squareSelect";
import CheckoutButton from "./checkoutButton";

const CartBar = () => {
   const { isCartOpen, closeCart, items, removeItem } = useCartStore();
      const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
     {isCartOpen && (
       <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end sm:px-5"
      >
        <div
          className={`bg-white sm:w-[70vw] lg:w-[28vw] h-screen py-8 flex flex-col transform transition-transform duration-300 ${
    isCartOpen ? "translate-x-0" : "translate-x-full"
  }`}
          onClick={(e) => e.stopPropagation()}
        >
          
          <div className="flex-1 py-2">
            <div className="flex items-center justify-between mx-5 border-black pb-6 border-b ">
              <div className="font-light text-sm ">
                <span className="font-semibold">Cart</span>
                <span>({totalItems} items)</span>
              </div>

              <button onClick={closeCart}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className=" py-5 space-y-4 h-70 overflow-y-auto ">
             <div className="px-6">

          {items.length === 0 ? (
            <div className="py-5">
              Your Cart is empty.
              <Link href={"/products"} className=" px-5 underline">
                Continue Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
                <div key={item.id} className="border-b pb-2">
                    <div className="flex items-start py-4 justify-between ">
                <div className="flex gap-2 items-start w-4/6">
                  <div>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={100}
                      height={130}
                      className="bg-[#e3e3e3]"
                    />
                  </div>

                  <div className="text-xs w-1/2">{item.title}</div>

                 
                </div>

                <button onClick={() => removeItem(item.id)}>
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="flex justify-between pl-24   items-center">
                    <SquareSelector item={item}/>
                    <p className="text-xs ">
                      $
                      <span>
                        {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>

              
            ))
          )}
        </div>
            </div>

            <div className="mx-5 my-3 border-t py-3">
              <div className="flex justify-between items-center">
                <h1 className="text-lg">Estimated Total</h1>
                <p className="text-xs pl-18">
                  N<span>{totalPrice}</span>
                </p>
              </div>
              <p className="text-xs font-light">
                Taxes and shipping are calculated at checkout.
              </p>

              <div className="py-4 space-y-2">
              <CheckoutButton/>

                <Link href={"/cart"} onClick={closeCart} className="h-7 w-full flex items-center  text-xs hover:underline  transition-all justify-center text-[#5d00d6]  border border-[#5d00d6]">
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
     )}
    </>
  );
};

export default CartBar;
