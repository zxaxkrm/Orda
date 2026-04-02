"use client"
import { motion } from "motion/react";
import Image from "next/image";


export default function Home() {
  return (
    <div>
     <div className="bg-[#54c6f0] min-h-125 flex flex-col items-center justify-center px-38 py-20">

      {/* Bordered container with floating badge */}
      <div className="relative border border-white/40 w-full flex flex-col items-center   py-16">

        {/* Corner markers */}
        <span className="absolute -top-4 -left-1.5 text-white/40 text-lg">+</span>
      <span className="absolute -top-4 -right-1.5 text-white/40 text-lg">+</span>
      <span className="absolute -bottom-3.5 -left-1.5 text-white/40 text-lg">+</span>
      <span className="absolute -bottom-3.5 -right-1.5 text-white/40 text-lg">+</span>

        {/* Floating Badge — sits on top border */}
        <div className="absolute bg-[#54c6f0] z-10 -top-7  rounded-full px-2 py-2 text-sm font-medium text-black border border-gray-200">
          <div className="bg-white rounded-full py-2 px-2">
            Shop Our Bestseller
          </div>
        </div>

       
        <div className="flex gap-5 items-center">

          <div className="border border-gray-200 rounded-md h-85 w-60">
            <Image src={"/tv.avif"} alt="tv" width={300} height={300} className="overflow-hidden"/>
            <div className="px-3 py-1 ">
              <p className=" text-sm">Smart TV 55 Inches Televison 4K LED TV Ultra ....</p>

                <div className="font-bold">
                  <span>NGN</span>
                  <span>780,000</span>
                </div>
            </div>

          </div>

           <div className="border border-gray-200 h-85 w-60">

          </div>

           <div className="border border-gray-200 h-85 w-60">

          </div>

        </div>

      </div>
    </div>

    
    
    </div>
  );
}
