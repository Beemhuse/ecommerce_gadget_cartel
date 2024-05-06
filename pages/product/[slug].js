import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  decrementQuantity,
  incrementQuantity,
  toggleCart,
  toggleCartItemQuantity,
} from "../../store/reducers/cartReducer";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, _id } = product;

  const [index, setIndex] = useState(0);
  // const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const { showCart, cartItems, totalPrice, qty } = useSelector(
    (state) => state.cart
  );
  // const [localQty, setLocalQty] = useState(qty); // Local state for quantity

  const dispatch = useDispatch();
  const itemInCart = cartItems.find((item) => item._id === _id);
  const itemQuantity = itemInCart ? itemInCart?.quantity : qty;

  const formatCurrency = useCurrencyFormatter("NGN");

  const handleBuyNow = () => {
    dispatch(addCartItem({ product, quantity: qty }));
    dispatch(toggleCart());
  };
  const handleIncrement = () => {
    dispatch(
      toggleCartItemQuantity({ id: _id, value: "inc", product, quantity: qty })
    );
  };

  const handleDecrement = () => {
    dispatch(
      toggleCartItemQuantity({ id: _id, value: "dec", product, quantity: qty })
    );
  };
  const handleAddToCart = () => {
    dispatch(addCartItem({ product, quantity: qty }));
    dispatch(toggleCart());
  };

  console.log("Image ===>", image);
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={
                image && image?.length > index
                  ? urlFor(image[index])
                  : "default-placeholder.png"
              }
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image &&
              image?.map((item, i) => (
                <img
                  key={i}
                  src={urlFor(item) || "default-placeholder.png"}
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1 className="font-semibold text-xl">{name}</h1>

          <h4>Specifications: </h4>
          <p className="h-[150px] w-[300px] shadow-lg p-2  overflow-y-scroll no-scrollbar">
            {details}
          </p>
          <p className="price">{formatCurrency(price)}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc flex items-center">
              <span className="minus" onClick={handleDecrement}>
                <AiOutlineMinus />
              </span>
              <span className="num">{itemQuantity}</span>
              <span className="plus" onClick={handleIncrement}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="flex items-center gap-4 track">
            {products?.slice(0, 6)?.map((item) => (
              <Product key={item?._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  // Updated query to exclude drafts and ensure slug is defined and non-null
  const query = `*[_type == "product" && !(_id in path("drafts.**")) && defined(slug.current) && slug.current != null] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  // Map the results to paths, only including entries with valid slugs
  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: "blocking", // Can be 'false' or 'blocking' depending on your needs for static generation
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);
  if (!product) {
    return {
      notFound: true, // This will render a 404 page
    };
  }

  return {
    props: { products, product },
  };
};

export default ProductDetails;
