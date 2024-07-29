import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../lib/client";
import CategoryList from "../../components/collection/CategoryList";
import Link from "next/link";
import EmptyProduct from "../../components/empty/EmptyProduct";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import Image from "next/image";

const Index = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5); // Set your desired products per page
  const formatCurrency = useCurrencyFormatter("NGN");

  useEffect(() => {
    if (categories && categories?.length > 0) {
      setSelectedCategory(categories[0]);
      setActiveCategory(categories[0]?._id);
    }
  }, [categories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category?._id);
    setCurrentPage(1); // Reset current page when category changes
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = selectedCategory?.products?.slice(
    indexOfFirstProduct,
    15
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
console.log("current products ==>>> ",currentProducts);
  return (
    <div className="p-4">
      <CategoryList
        categories={categories}
        handleCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />

      {selectedCategory && (
        <div className="mt-5 flex justify-start w-[80%] m-auto items-start flex-wrap gap-5">
          {selectedCategory?.products.length === 0 ? (
            <EmptyProduct
              message={`No products in ${selectedCategory?.name} collection`}
            />
          ) : (
            <>
              {currentProducts.length === 0 ? (
                <EmptyProduct
                  message={`No products in ${selectedCategory?.name} collection`}
                />
              ) : (
                <>
                  {currentProducts?.map((product) => (
                    <Link
                      href={`/product/${product?.slug?.current}`}
                      key={product?._id}
                      className="border p-2 rounded-lg flex cursor-pointer flex-col"
                    >

                      <Image
                        src={urlFor(product?.image[0]).toString()}
                        width={250}
                        height={250}
                        className="product-image"
                      />
                      <div className=" ">
                        <h2 className="font-bold xl:my-3 text-md">
                          {product?.name}
                        </h2>
                        
                        <span className="text-[#F02D34] font-bold text-xs">
                          {formatCurrency(product?.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}
      
      <div className="flex justify-center items-center mt-8 gap-4">
        {currentPage > 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="text-xl bg-black text-white px-4 py-1 rounded-md"
          >
            Previous
          </button>
        )}
        {currentProducts?.length > 0 && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="text-xl bg-black text-white px-4 py-1 rounded-md"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    // Fetch categories
    const categoryQuery = '*[_type == "category"]{...}';
    const categories = await client.fetch(categoryQuery);

    // Fetch products associated with each category
    for (const category of categories) {
      const productQuery = '*[_type == "product" && references($categoryId)]';
      const products = await client.fetch(productQuery, {
        categoryId: category._id,
      });
      category.products = products;
    }

    return {
      props: { categories },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: { categories: [] },
    };
  }
};

export default Index;
