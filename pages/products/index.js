import React from "react";
import { Product } from "../../components";
import { client } from "../../lib/client";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Index({ products, totalPages }) {
  const router = useRouter();
  const { page = 1 } = router.query;

  // Convert page to number
  const currentPage = parseInt(page, 10);

  // Calculate start and end page numbers for pagination display
  const maxPagesToShow = 10;
  const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  return (
    <section>
      <h2 className="text-center xl:text-3xl text-xl text-gray-400">All Products</h2>
      <div className="grid xl:grid-cols-4 grid-cols-2 justify-center w-[80%] m-auto gap-y-8">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center my-9">
        {currentPage > 1 && (
          <Link href={`/products/?page=${currentPage - 1}`}>
            <p className="px-4 py-2 mx-1 bg-gray-200 rounded-md">Previous</p>
          </Link>
        )}
        {[...Array(endPage - startPage + 1).keys()].map((index) => {
          const pageNumber = startPage + index;
          return (
            <Link href={`/products/?page=${pageNumber}`} key={pageNumber}>
              <p className={`px-4 py-2 mx-1 ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-md`}>
                {pageNumber}
              </p>
            </Link>
          );
        })}
        {currentPage < totalPages && (
          <Link href={`/products/?page=${currentPage + 1}`}>
            <p className="px-4 py-2 mx-1 bg-gray-200 rounded-md">Next</p>
          </Link>
        )}
      </div>
    </section>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { page = 1, limit = 12 } = query;
  const skip = (page - 1) * limit;

  // Fetch products with pagination
  const productQuery = `*[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt asc)[${
    skip
  }...${skip + limit}]`;
  const products = await client.fetch(productQuery);

  // Fetch total count of products for pagination
  const totalCountQuery = `count(*[_type == "product" && !(_id in path("drafts.**"))])`;
  const totalCount = await client.fetch(totalCountQuery);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    props: { products, totalPages },
  };
};
