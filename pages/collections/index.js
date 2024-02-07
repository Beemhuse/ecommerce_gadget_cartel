import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';

const Index = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
console.log(categories)
  return (
    <div>
      <h1>Categories:</h1>
      {categories.map((category) => (
        <div key={category._id}>
          <h2 onClick={() => handleCategoryClick(category)}>
            {category.name}
          </h2>
        </div>
      ))}
      <hr />
      {selectedCategory && (
        <div>
          <h3>Products under {selectedCategory.name}:</h3>
          {selectedCategory.products.map((product) => (

            <div key={product?._id}>
                 <img 
            src={urlFor(product?.image && product?.image[0])}
            width={250}
            height={250}
            className="product-image"
          />
              <p>{product.name}</p>
              <p className='border border-red-500'>Price: ${product.price}</p>
              {/* Add additional rendering for other product properties */}
            </div>
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
      const products = await client.fetch(productQuery, { categoryId: category._id });
      category.products = products;
    }

    return {
      props: { categories },
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: { categories: [] },
    };
  }
};

export default Index;
