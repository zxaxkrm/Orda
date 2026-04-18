import { Product } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import AddToCartButton from "./addToCart";

const ProductCardPage = ({ item }: { item: Product }) => {
  return (
    <div>
      <div className="border border-gray-200 rounded-md h-85 px-2 ">
        <Link href={`/products/${item.id}`}>
          <div className="w-full relative bg-[#f5f5f5] rounded-lg overflow-hidden h-3/5">
            <Image
              src={item.thumbnail}
              alt="tv"
              fill
              sizes="100vw"
              className="w-full object-contain rounded-xl"
            />
          </div>

          <div className="px-3 py-1 space-y-2">
            <p className="text-xs line-clamp-1 text-center">{item.title}</p>

            <div className="text-xs flex items-center justify-center">
              <span>$</span>
              <span>{item.price.toLocaleString()}</span>
            </div>
          </div>
        </Link>
        <div className=" space-y-2.5 justify-between items-center px-3">
          <AddToCartButton product={item} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardPage;
