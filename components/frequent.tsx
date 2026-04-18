"use client"
import { frequentlysearched } from "@/lib/data";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function FrequentSearch() {
  const autoScroll = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <>
      <div className="">
        <Carousel
          plugins={[autoScroll.current]}
          onMouseEnter={autoScroll.current.stop}
          onMouseLeave={autoScroll.current.reset}
          className="w-120 bg-gray-50 rounded-md "
        >
          <CarouselContent className="-ml-3">
            {frequentlysearched.map((freq) => (
              <CarouselItem key={freq.id} className="pl-3 basis-1/2">
                <Link href={"/"}>
                  <div className="max-h-85 min-h-85 rounded-2xl px-3 space-y-4 py-3  border border-gray-200">
                    <div>
                      <h1 className="font-semibold text-xl">
                        Frequently Searched
                      </h1>
                      <p className="font-semibold text-lg">{freq.name}</p>
                    </div>

                    <div className="flex items-center justify-center ">
                      <Image
                        src={freq.image}
                        alt={freq.name}
                        width={250}
                        height={250}
                        className="rounded-2xl h-fit w-fit"
                      />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
