import React from "react";
import { Product } from "../../components";
import { client } from "../../lib/client";
import Link from "next/link";

export default function Index({ products, totalPages }) {
  return (
    <section>
      <h2 className="text-center xl:text-3xl text-xl text-gray-400 ">All Products</h2>
      <div className="grid xl:grid-cols-4 grid-cols-2 justify-center w-[80%] m-auto space-y-8 ">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center my-9">
        {[...Array(totalPages).keys()].map((page) => (
          <Link href={`/products/?page=${page + 1}`} key={page}>
            <p className="px-4 py-2 mx-1 bg-gray-200 rounded-md">{page + 1}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { page = 1, limit = 9 } = query;
  const skip = (page - 1) * limit;

  // Fetch products with pagination
  const productQuery = `*[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt desc)[${
    skip
  }...${skip + limit - 1}]`;
  const products = await client.fetch(productQuery);

  // Fetch total count of products for pagination
  const totalCountQuery = `count(*[_type == "product" && !(_id in path("drafts.**"))])`;
  const totalCount = await client.fetch(totalCountQuery);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    props: { products, totalPages: totalPages },
  };
};

