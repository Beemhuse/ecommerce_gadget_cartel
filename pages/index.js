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
  // Fetch products for laptops
  const productQuery = '*[_type == "product"]';
  const product = await client.fetch(productQuery);
  // console.log('Laptop Products:', product);



  // Fetch banner data
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  // Fetch categories
  const categoryQuery = '*[_type == "category"]';
  const categories = await client.fetch(categoryQuery);
  const laptopCategoryQuery = '*[_type == "category" && name == "Laptop"]{_id}';
  const laptopCategoryId = (await client.fetch(laptopCategoryQuery))[0]?._id;

  // Fetch all products with the specified category _id
  const laptopProductsQuery = `*[_type == "product" && category._ref == "${laptopCategoryId}"]`;
  const laptopProducts = await client.fetch(laptopProductsQuery);

  const phoneCategoryQuery = '*[_type == "category" && name == "Phone"]{_id}';
  const phoneCategoryId = (await client.fetch(phoneCategoryQuery))[0]?._id;

  const phoneProductsQuery = `*[_type == "product" && category._ref == "${phoneCategoryId}"]`;
  const phoneProducts = await client.fetch(phoneProductsQuery);
  console.log('phone Products:', phoneProducts);

  return {
    props: { product, phoneProducts, laptopProducts, bannerData, categories },
  };
};


export default Home;
