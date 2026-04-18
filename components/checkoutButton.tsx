"use client";

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CheckoutButton = () => {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
 
   
      setIsLoading(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ items, total: total() }),
    });

    const data = await res.json();
    console.log(res.status, data);

    if (res.ok) {
       toast.success("Order placed successfully!");
      clearCart();
      router.push("/orders");
    }else{
      toast.error("Something went wrong. Please try again.");
    }
   
  setIsLoading(false);
};

  return (
    <button disabled={isLoading} onClick={handleCheckout} className="h-7 w-full rounded-md flex items-center text-white text-xs hover:bg-black hover:underline hover:text-white transition-all justify-center bg-[#5d00d6]">
      {isLoading ? (
              <div className="flex justify-center items-center py-6">
      <div className="w-3 h-3 border-4 border-gray-300 border-t-white rounded-full animate-spin" />
    </div>
      ):(
        <div>
          Checkout
        </div>
      )}
    </button>
  );
};

export default CheckoutButton;
