import React from 'react';

import { client } from '../lib/client';
import { Product, MobileProducts, LaptopProducts, HeroBanner, ShopSale, Features } from '../components';

const Home = ({  bannerData, phoneProducts, laptopProducts }) => {
console.log(laptopProducts)
  return (

  <div>

    <HeroBanner heroBanner={bannerData?.length && bannerData[0]}  />
    <Features />
    <MobileProducts products={phoneProducts} />
    <LaptopProducts products={laptopProducts} />
    <ShopSale />

  </div>

  )

  
};

export const getServerSideProps = async () => {
  // Set up the client - assuming 'client' is already defined elsewhere in your setup
  // Initialize the client if not already done (pseudo-code):
  // const client = sanityClient({projectId: 'your_project_id', dataset: 'your_dataset'});

  // Fetch products for laptops, excluding drafts
  const productQuery = '*[_type == "product" && !(_id in path("drafts.**"))]';
  const product = await client.fetch(productQuery);

  // Fetch banner data, excluding drafts
  const bannerQuery = '*[_type == "banner" && !(_id in path("drafts.**"))]';
  const bannerData = await client.fetch(bannerQuery);

  // Fetch categories, excluding drafts
  const categoryQuery = '*[_type == "category" && !(_id in path("drafts.**"))]';
  const categories = await client.fetch(categoryQuery);

  // Fetch the specific category ID for laptops, excluding drafts
  const laptopCategoryQuery = '*[_type == "category" && name == "Laptop" && !(_id in path("drafts.**"))]{_id}';
  const laptopCategoryId = (await client.fetch(laptopCategoryQuery))[0]?._id;

  // Fetch all products with the specified category _id, excluding drafts
  const laptopProductsQuery = `*[_type == "product" && category._ref == "${laptopCategoryId}" && !(_id in path("drafts.**"))]`;
  const laptopProducts = await client.fetch(laptopProductsQuery);

  // Fetch the specific category ID for phones, excluding drafts
  const phoneCategoryQuery = '*[_type == "category" && name == "Phone" && !(_id in path("drafts.**"))]{_id}';
  const phoneCategoryId = (await client.fetch(phoneCategoryQuery))[0]?._id;

  // Fetch all products with the specified category _id, excluding drafts
  const phoneProductsQuery = `*[_type == "product" && category._ref == "${phoneCategoryId}" && !(_id in path("drafts.**"))]`;
  const phoneProducts = await client.fetch(phoneProductsQuery);
  
  // Optionally log the products for debugging
  console.log('Laptop Products:', laptopProducts);
  console.log('Phone Products:', phoneProducts);

  return {
    props: { product, phoneProducts, laptopProducts, bannerData, categories },
  };
};


export default Home;
