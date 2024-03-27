
import React from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Slider from "react-slick";
import { useRouter } from "next/router";


const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  
  };

const HeaderSlides = () => {
const router = useRouter()
  return (
    <Slider {...settings}

      >
      <div className="">
        <div className="mb-20 slide1 relative w-[100vw] h-[80vh]">
          {/* <img src={bg_img} alt="" className="w-full h-full object-cover" /> */}
          <div className="absolute bg-black bg-opacity-40 flex flex-col gap-3 md:gap-7 justify-center items-center top-0 right-0 bottom-0 left-0  text-white px-10 mt-12 lg:mt-0">
            <p className="uppercase text-2xl md:text-5xl  text-center  font-semibold lg:w-[70vw] xl:w-[60vw] mb-5 md:mt-5">
              Welcome to Gadget Cartel
            </p>
            <p className="capitalize md:text-xl text-center  font-semibold lg:w-[60vw] xl:w-[45vw] leading-normal">
              Home of  gadgets and software products for all. 
            </p>
            <div className="flex items-center justify-center gap-2 md:gap-10 mt-5 md:mt-10">
              <button
                onClick={() => router.push("products")}
                className="text-xs md:text-base font-semibold px-7 py-3 text-white bg-[#F02D34] border-2 border-0 outline-none"
              >
                Shop now
              </button>
              <button

              onClick={() => router.push("contact")}
                className="text-xs md:text-base  font-semibold px-7 py-3  text-black border-2 border-[#F02D34] outline-none"
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="mb-20 slide2  relative w-[100vw]  h-[80vh]">
          {/* <img src={cubes_img} alt="" className="w-full h-full object-cover" /> */}
          <div className="absolute flex bg-black bg-opacity-40  flex-col gap-3 md:gap-7 justify-center items-center top-0 right-0 bottom-0 left-0 bg-opacity-10 text-white px-10 mt-12 lg:mt-0">
            <p className="uppercase md:text-xl text-center font-semibold lg:w-[70vw] xl:w-[60vw] mb-5 md:mt-5">
              Welcome to Gadget Cartel
            </p>
            <p className="capitalize text-2xl md:text-5xl text-center  font-semibold lg:w-[60vw] xl:w-[45vw] leading-normal">
Best deals awaits you!            </p>
            <div className="flex items-center justify-center gap-2 md:gap-10 mt-5 md:mt-10">
              <button
              onClick={() => router.push("products")}
                className="text-xs md:text-base font-semibold px-7 py-3 text-white bg-[#F02D34] border-2 border-0 outline-none"
              >
                Shop now
              </button>
              <button
                onClick={() => {
                //   scrollToTop();
                //   navigate("/services");
                }}  
                className="text-xs md:text-base font-semibold px-7 py-3  text-black border-2 border-[#F02D34] outline-none"
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default HeaderSlides;
