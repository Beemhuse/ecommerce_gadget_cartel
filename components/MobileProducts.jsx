import React from 'react'
import Product from "./Product";
import Slider from "react-slick";
import EmptyProduct from "./empty/EmptyProduct";

export default function MobileProducts({products}) {
  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: (products?.length), // Adjust the number of slides to show
      slidesToScroll: 1,
    };
    console.log("phone products ==> ", products?.length)
  return (
    <div className=" px-8 xl:w-2/3 w-full mx-auto overflow-hidden">
        <div className="flex justify-between items-center">
        <h2 className="xl:text-3xl text-xl text-center font-bold">Mobile products</h2>
        <p className="text-lg  text-center font-bold">Go to shop</p>

        </div>
        <div className="my-[40px]">
{
    products?.length === 0 ? 
    <>
    <EmptyProduct />
    </>:

 <Slider {...settings}>
      {products?.map((product) => (
  <div key={product?._id}>
  {/* <Product product={product} /> */}
</div>      ))}
    </Slider>
}
        </div>
    </div>
  )
}
