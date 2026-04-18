"use client";
import Autoplay from "embla-carousel-autoplay";

import { useRef } from "react";
import AddToCartButton from "./addToCart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const BestsellerItems = ({ products }: { products: Product[] }) => {
  const autoScroll = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  return (
    <>
      <section className="bg-[#ebebeb] flex flex-col items-center justify-center mx-6 my-10  rounded-3xl">
        <div className="   w-full flex flex-col items-center">
          <div className="py-5 font-bold text-2xl">
            <h1 className="text-center ">Shop Our Bestsellers</h1>
          </div>

          <div className="w-full  md:max-w-5xl ">
            <Carousel
              className="w-full"
              plugins={[autoScroll.current]}
              onMouseEnter={autoScroll.current.stop}
              onMouseLeave={autoScroll.current.reset}
            >
              <CarouselContent className="">
                {products.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className=" basis-full md:basis-1/2 lg:basis-1/4"
                  >
                    <div className="border border-gray-200 rounded-md h-95 ">
                      <Link href={`/products/${item.id}`}>
                        <div className="w-full relative bg-[#f5f5f5] rounded-lg overflow-hidden h-3/5">
                          <Image
                            src={item.thumbnail}
                            alt="tv"
                            width={100}
                            height={100}
                            sizes="100vw"
                            className="w-full object-cover rounded-xl"
                          />
                        </div>

                        <div className="px-3 py-1 space-y-3">
                          <p className="text-xs line-clamp-1 text-center">
                            {item.title}
                          </p>

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
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default BestsellerItems;
