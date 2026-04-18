"use client";
import SquareSelector from "@/components/squareSelect";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import CheckoutButton from "@/components/checkoutButton";

const CartPage = () => {
  const { items, removeItem} = useCartStore();

    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="lg:px-33 max-sm:p-4 max-lg:p-8 sm:py-10">
      <div className=" py-7 sm:flex justify-between">
        <div>
          <div className="border-b ">
            <h1>My Cart</h1>
          </div>

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

                  <div className="flex justify-between max-sm:hidden items-center">
                    <SquareSelector item={item}/>
                    <p className="text-xs pl-18">
                      N
                      <span>
                        {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>

                <button onClick={() => removeItem(item.id)}>
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="flex justify-between pl-25  sm:hidden items-center">
                    <SquareSelector item={item}/>
                    <p className="text-xs ">
                      N
                      <span>
                        {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>

              
            ))
          )}
        </div>

        <div>
          <div className="">
            <h1 className="max-sm:hidden">Order Summary</h1>
            <div className="lg:w-60 sm:w-50  sm:border-y  text-xs py-4 ">
              <div className="flex justify-between items-center text-xs mb-5">
                <p>Subtotal ({totalItems} items)</p>

                <p>
                  $<span>{totalPrice.toLocaleString()}</span>
                </p>
              </div>

              <h1>Delivery: <span>Ships in 3 days</span></h1>
              
            </div>
          </div>
          <div className="flex justify-between items-center text-base my-4">
            <p>Total</p>

            <p>
              $<span>{totalPrice.toLocaleString()}</span>
            </p>
          </div>

          <CheckoutButton/>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
