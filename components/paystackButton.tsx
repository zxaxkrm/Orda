"use client";

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { usePaystackPayment } from "react-paystack";

import  {useSession} from "next-auth/react";

const PayStackButton = () => {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const {data : session} = useSession();
  const [isLoading, setIsLoading] = useState(false);


const config = {
  reference: new Date().getTime().toString(),
  email: session?.user?.email || "guest@example.coom",
  amount: total() * 100,
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  currency: "NGN"
};


const onSuccess = async (reference: {reference: string}) => {
  setIsLoading(true);
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({

        items,
        total: total(),
        status: "paid",
        paymentReference: reference.reference,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Order placed successfully!");
      clearCart();
      router.push("/orders")
    }else{
      toast.error("Payment received but order failed. Contact support.");
    }
  } catch (err) {
    toast.error("Something went wrong. Please try again.");
  }finally{
    setIsLoading(false);
  }
};

const onClose = ()=>{
  toast.error("Payment Cancelled");
};

const initializePayment = usePaystackPayment(config);



  const handleCheckout = async () => {
        if(items.length === 0){
          toast.error("Your Cart is Empty");
          return;
        }

        initializePayment({onSuccess, onClose});
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

export default PayStackButton;
