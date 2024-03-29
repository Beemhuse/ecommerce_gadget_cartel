import Link from "next/link";
import React from "react";
// import image from "../"
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ShopSale() {
  return (
    <div className="bg-[#000]/10 h-[50vh] flex justify-center items-center">
      <div className="text-black text-center flex flex-col gap-3 font-bold">
        <p className="text-red-500 text-4xl">10% <span className="text-lg">off</span> </p>
        <h2 className="text-6xl">New year sale</h2>
        <Link href={"/products"}>
          <button className="bg-black text-white p-4">Shop Now</button>
        </Link>
      </div>
    
      <img
        src="/assets/watch_1.webp"
        className="w-1/4 h-auto"
        alt="Watch Slide"
      />
     
    </div>
  );
}
