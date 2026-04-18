import OrderList from "@/components/orderList";
import Spinner from "@/components/spinner";
import { Suspense } from "react";

const page = async () => {
   

  return (
    <div className="min-h-dvh px-10 py-15">
      <h1 className="font-bold sm:text-5xl text-3xl">Orders</h1>

        <Suspense fallback={<Spinner/>}>
            <OrderList/>
        </Suspense>
    </div>
  );
};

export default page;
