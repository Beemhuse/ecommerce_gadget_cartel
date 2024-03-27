import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { createOrder, urlFor } from '../lib/client';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeCartItem,  toggleCart } from '../store/reducers/cartReducer';
import axios from 'axios';
import useLoggedInStatus from '../hooks/useLoggedinStatus';
import CircularSpinner from './spinner/CircularSpinner';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';

function generateTransactionNumber(prefix) {
  // Generate a random 7-digit number
  const randomDigits = Math.floor(Math.random() * 9000000) + 1000000;

  // Combine the prefix and random number
  const transactionNumber = prefix + randomDigits;

  return transactionNumber;
}

// Example usage with a prefix
// const transactionNumber = generateTransactionNumber('GC');
const Cart = () => {
  const cartRef = useRef();
  const { showCart, cartItems, totalPrice,  totalQuantities, qty } = useSelector((state) => state?.cart);
  const dispatch =useDispatch()
  const [loading, setLoading] = useState(false)
console.log(totalQuantities)
const isLoggedIn = useLoggedInStatus();
const cookies = new Cookies();
const router = useRouter()
const user = cookies.get('GC_user');
console.log(user)
  const handleShowCart =()=>{
    dispatch(toggleCart());
  
  }
  const handleRemoveFromCart = (product) => {
    dispatch(removeCartItem({ product }));
  };
  const handleCheckout = async () => {
    try {
      if (!isLoggedIn) {
        // Redirect to the login page if the user is not logged in
        router.push('/signin');
        return;
      }
      setLoading(true)
      // Call createOrder function before processing payment
      const amount = totalPrice

      // Call Paystack API to initiate payment
     await axios.post('/api/paystack', {   cartItems,
          amount,
          email: user.email,
          location: 'Some Location',
          deliveryAddress: "address",
          
        })

      .then((res)=>{
        setLoading(false)

        console.log(res)
        const paymentLink = res?.data?.paymentResponse?.data?.authorization_url;
        console.log(paymentLink)
        if(paymentLink){
          window.location.href = paymentLink;

          //  createOrder(cartItems, amount, "bright@mail.com", 'Some Location', '123 Main Street, City' );
        }
      })

    } catch (error) {
      setLoading(false)

      console.error('Error handling checkout:', error);
    }
  };


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
                  <h4>N{item?.price}</h4>
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
              <h3>N{totalPrice}</h3>
            </div>
            <div className="mt-6">
              <button type="button" 
                    className={`border  rounded-xl bg-black h-14  w-full text-white text-xl relative ${loading ? 'cursor-not-allowed' : ''}`}
                    onClick={handleCheckout}
                    disabled={loading} // Disable the button when loading is true
                    >
               {loading ? (
       <CircularSpinner />
      ) :
      " Pay with paystack "
    
    }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart