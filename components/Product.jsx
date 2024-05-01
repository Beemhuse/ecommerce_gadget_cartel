import React, { useState } from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';
import useCurrencyFormatter from '../hooks/useCurrencyFormatter';

const Product = ({ product: { image, name, slug, description, price } }) => {
  const [isHovered, setIsHovered] = useState(false);
const formatCurrency = useCurrencyFormatter("NGN")
  console.log(image)
  return (
    <div className="relative">
    <Link href={`/product/${slug?.current}`}>
      <div
        className=" xl:max-w-[700px] lg:w-2/4 h-auto w-[50%] relative  transform flex flex-col transition-transform duration-300 hover:scale-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={urlFor(image && image[0])}
          className=' object-cover'
          alt={name}
        />
        <div className="flex flex-col">
        <div className="flex items-center xl:p-3 xl:flex-row flex-col justify-between">

        <p className="font-bold xl:my-7 text-md ">{name}</p>
        <p className='text-[#F02D34] font-bold text-xs'>{formatCurrency(price)}</p>

        </div>

        <p>{description}</p>
        </div>
        {isHovered && (
            <div className={`absolute inset-0 flex justify-center items-center transition-all duration-300 ease-in h-full ${isHovered ? ' bg-[#000]/50 bg-opacity-2' : ' pointer-events-none'}`}>
              <button
                onClick={() => {
                  console.log('Add to Cart clicked for', name);
                }}
                className="bg-[#F02D34] text-white px-3 py-2 rounded "
              >
                Add to Cart
              </button>
            </div>
          )}
      </div>
    </Link>
  </div>
  )
}

export default Product