import BestsellerPage from "@/components/bestseller";
import Promo from "@/components/promo";
import SuggestPage from "@/components/suggest";
import Link from "next/link";
import CartBar from "@/components/cartBar";
import { Suspense } from "react";
import PromoSkeleton, { BestSellerGridSkeleton, SuggestGridSkeleton } from "@/components/skeletons";

export default  function Home() {
  return (
    <div className="">
      <Suspense fallback={<BestSellerGridSkeleton/>}>
        <BestsellerPage />
      </Suspense>

      <Suspense fallback={<PromoSkeleton/>}>
        <Promo />
      </Suspense>

      <Suspense fallback={<SuggestGridSkeleton/>}>
        <SuggestPage />
      </Suspense>

      <CartBar />

      <div className="flex justify-end px-10 ">
        <Link
          href={"/products"}
          className="underline text-sm hover:text-blue-800"
        >
          See All Products
        </Link>
      </div>
    </div>
  );
}
