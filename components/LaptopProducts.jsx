import React from 'react'
import Slider from "react-slick";
import Product from './Product';
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of slides to show
    slidesToScroll: 1,
  };

export default function LaptopProducts({products}) {
  return (
    <div className=" px-8 w-2/3 mx-auto overflow-hidden mt-[100px]">
    <div className="flex justify-between border-b border-0 py-2 border-b-[#ECF1F2] border-6">
    <h2 className="text-3xl text-center font-bold">Laptops</h2>
    <p className="text-lg mt-4 text-center font-bold">Go to shop</p>

    </div>
    <div className="my-[40px]">

<Slider {...settings}>
  {products?.map((product) => (
    <Product key={product?._id} product={product} />
  ))}
</Slider>
    </div>
</div>  )
}
