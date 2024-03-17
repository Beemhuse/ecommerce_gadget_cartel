import React, { useState } from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, description, price } }) => {
  const [isHovered, setIsHovered] = useState(false);

  console.log(image)
  return (
    <div className="relative">
    <Link href={`/product/${slug?.current}`}>
      <div
        className=" xl:max-w-2/4 lg:w-2/4 w-full relative transform flex flex-col transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={urlFor(image && image[0])}
          height={250}
          alt={name}
        />
        <div className="flex flex-col">
        <div className="flex items-center p-3  justify-between">

        <p className="font-bold my-7 xl:text-xl text-lg">{name}</p>
        <p className='text-[#F02D34] font-bold text-md'>N{price}</p>

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