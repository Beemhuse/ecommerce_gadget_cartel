import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeCartItem, removeCartItemById, toggleCart, toggleCartItemQuantity } from '../store/reducers/cartReducer';

const Cart = () => {
  const cartRef = useRef();
  const { showCart, cartItems, totalPrice,  totalQuantities, qty } = useSelector((state) => state?.cart);
  const dispatch =useDispatch()
console.log(totalQuantities)
  // const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();
  const handleShowCart =()=>{
    dispatch(toggleCart());
  
  }
  const handleRemoveFromCart = (product) => {
    dispatch(removeCartItem({ product }));
  };
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={handleShowCart}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems?.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={handleShowCart}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems?.length >= 1 && cartItems?.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="w-[150px] h-auto rounded-lg" />
              <div className="w-full  flex flex-col gap-4">
                <div className="flex w-full items-center justify-between">
                  <h5>{item?.name}</h5>
                  <h4>${item?.price}</h4>
                </div>
                <div className="flex justify-between items-center   ">
                <div className="quantity-desc grid grid-cols-3  items-center w-2/3 ">
              <p className="px-3 minus cursor-pointer" onClick={() => dispatch(decrementQuantity({ id: item?._id })) }><AiOutlineMinus /></p>
              <p className="px-3 num">{item?.quantity}</p>
              <p className="px-3 plus cursor-pointer" onClick={() => dispatch(incrementQuantity({ id: item?._id })) }><AiOutlinePlus /></p>
            </div>
                
                  <button
                    type="button"
                    className="remove-item"
                    onClick={()=> handleRemoveFromCart(item)}
                  
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart