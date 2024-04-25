import React from "react";
import { Product } from "../../components";
import { client } from "../../lib/client";

export default function index({ product }) {
  return (
    <section>
      <h2 className="text-center xl:text-3xl text-xl text-gray-400 ">All Products</h2>
    <div className="grid xl:grid-cols-4 grid-cols-1 items-center ">
      {product?.map((product) => (
        <Product key={product?._id} product={product} />
      ))}
    </div>
    </section>
  );
}

export const getServerSideProps = async () => {

  // Fetch products for laptops
  const productQuery = '*[_type == "product" && !(_id in path("drafts.**"))]';
  const product = await client.fetch(productQuery);

  console.log("phone Products:", product);

  return {
    props: { product },
  };
};
