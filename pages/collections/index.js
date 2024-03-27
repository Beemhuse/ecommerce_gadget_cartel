import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../lib/client";
import CategoryList from "../../components/collection/CategoryList";
import Link from "next/link";

const Index = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
console.log(categories)
const [activeCategory, setActiveCategory] = useState(null);

useEffect(() => {
  if (categories && categories?.length > 0) {
    setSelectedCategory(categories[0]);
    setActiveCategory(categories[0]?._id);
  }
}, [categories]);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedCategory(category);
    setActiveCategory(category?._id);
  };

  console.log(categories);
  return (
    <div className="p-4">
      <CategoryList
        categories={categories}
        handleCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />

      {selectedCategory && (
        <div className="mt-5 flex flex-wrap gap-5">
          {selectedCategory?.products?.map((product) => (
            <Link href={`/product/${product?.slug?.current}`} key={product?._id} className="border p-2 rounded-lg flex cursor-pointer flex-col">
              <img
                src={urlFor(product?.image && product?.image[0])}
                width={250}
                height={250}
                className="product-image"
              />
            
              <div className="flex gap-2 mt-auto ">
              <h2 className="font-semibold">{"Name"}:</h2>
              <h2 className="">{product?.name}</h2>

              </div>
              div
              <p className="font-semibold">Price: </p>
              <span>{product?.price}</span>
            </Link>
          ))}
        </div>
      )}
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
