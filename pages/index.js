import React from 'react';

import { client } from '../lib/client';
import { Product, MobileProducts, LaptopProducts, HeroBanner, ShopSale, Features } from '../components';

const Home = ({ products, bannerData, categories, laptopProducts }) => {
console.log(laptopProducts)
  return (

  <div>

    <HeroBanner heroBanner={bannerData?.length && bannerData[0]}  />
    <Features />
    <MobileProducts products={products} />
    <LaptopProducts products={laptopProducts} />
    <ShopSale />

    {/* <FooterBanner footerBanner={bannerData && bannerData[0]} /> */}
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
  console.log('Laptop Products:', laptopProducts);

  const phoneCategoryQuery = '*[_type == "category" && name == "Phones"]';
  const phoneProducts = (await client.fetch(phoneCategoryQuery));
  return {
    props: { product, phoneProducts, laptopProducts, bannerData, categories },
  };
};


export default Home;
