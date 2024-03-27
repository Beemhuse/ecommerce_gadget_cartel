import React from 'react'
// import image from "../"
export default function ShopSale() {
  return (
    <div className='bg-[#000]/10 h-[40vh] flex justify-center items-center'>
<div className="text-black text-center flex flex-col gap-3 font-bold">
<p>10% off</p>
<h2 className='text-6xl'>New year sale</h2>
<button className='bg-black text-white p-4'>Shop Now</button>
</div>

<img src="./../public/assets/vecel.svg" width={50} height={50} alt="" />


    </div>
  )
}
