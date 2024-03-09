import React from "react";
import { Product } from "../../components";
import { client } from "../../lib/client";

export default function index({ product }) {
  return (
    <section>
    <div className="flex items-center">
      {product?.map((product) => (
        <Product key={product?._id} product={product} />
      ))}
    </div>
    </section>
  );
}

export const getServerSideProps = async () => {
  // Fetch products for laptops
  const productQuery = '*[_type == "product"]';
  const product = await client.fetch(productQuery);
  // console.log('Laptop Products:', product);

  console.log("phone Products:", product);

  return {
    props: { product },
  };
};
