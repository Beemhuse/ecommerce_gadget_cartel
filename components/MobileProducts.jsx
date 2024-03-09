import { FaOpencart } from "react-icons/fa6";
import React from 'react'
import Product from "./Product";
import Slider from "react-slick";
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of slides to show
    slidesToScroll: 1,
  };

export default function MobileProducts({products}) {
    console.log(products)
  return (
    <div className=" px-8 w-2/3 mx-auto overflow-hidden">
        <div className="flex justify-between">
        <h2 className="text-3xl text-center font-bold">Mobile products</h2>
        <p className="text-lg mt-4 text-center font-bold">Go to shop</p>

        </div>
        <div className="my-[40px]">
{
    products?.length === 0 ? 
    <>
    <EmptyProduct />
    </>:

 <Slider {...settings}>
      {products?.map((product) => (
        <Product key={product?._id} product={product} />
      ))}
    </Slider>
}
        </div>
    </div>
  )
}
