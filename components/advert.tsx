"use client"
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Imageslide } from "@/lib/data";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function Advert(){
    const autoScroll = useRef(Autoplay({ delay: 7000, stopOnInteraction: true }));
    return(

        <>
        <Carousel  plugins={[autoScroll.current]}
          onMouseEnter={autoScroll.current.stop}
          onMouseLeave={autoScroll.current.reset}>
            <CarouselContent>
                {Imageslide.map((slide)=>(
                    <CarouselItem key={slide.id} className="basis-full">
                          <div className="max-h-90 w-85 shrink-0 rounded-xl">
           <div className="h-85 ">
            <Image  src={slide.image} alt={slide.name} width={250} height={300} className="w-full h-85 rounded-xl"/>
           </div>
        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
        </>
      
    )
}