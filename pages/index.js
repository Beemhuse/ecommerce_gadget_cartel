import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
import Slider from 'react-slick';

const Home = ({ products, bannerData, categories }) => {
  // console.log(categories)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of slides to show
    slidesToScroll: 1,
  };

  return (

  <div>
    <HeroBanner heroBanner={bannerData?.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Best Seller Products</h2>
    </div>

    <Slider {...settings}>
      {products?.map((product) => (
        <Product key={product?._id} product={product} />
      ))}
    </Slider>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>

  )

  
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  // Fetch categories
  const categoryQuery = '*[_type == "category"]';
  const categories = await client.fetch(categoryQuery);


  return {
    props: { products, bannerData, categories }
  }
}

export default Home;
