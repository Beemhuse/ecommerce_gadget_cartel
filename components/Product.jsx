import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  console.log(image)
  return (
    <div>
      <Link href={`/product/${slug?.current}`}>
      <div className=" border w-2/3 relative overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <img 
            src={urlFor(image && image[0])}
            className="h-[200px] w-full border"
          />
          <p className="font-bold">{name}</p>
          <p className="">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product