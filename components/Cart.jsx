import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {  AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {  removeCartItem,  toggleCart } from '../store/reducers/cartReducer';
import axios from 'axios';
import useLoggedInStatus from '../hooks/useLoggedinStatus';
import CircularSpinner from './spinner/CircularSpinner';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';
import CartProduct from './CartProduct';
import useCurrencyFormatter from '../hooks/useCurrencyFormatter';
import toast from 'react-hot-toast';



// Example usage with a prefix
// const transactionNumber = generateTransactionNumber('GC');
const Cart = () => {
  const cartRef = useRef();
  const {  cartItems, totalPrice,  totalQuantities, } = useSelector((state) => state?.cart);
  const dispatch =useDispatch()
const formatCurrency = useCurrencyFormatter("NGN")
  
  const [loading, setLoading] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState('')
const isLoggedIn = useLoggedInStatus();
const cookies = new Cookies();
const router = useRouter()
const user = cookies.get('GC_user');
  const handleShowCart =()=>{
    dispatch(toggleCart());
  
  }
 
  const handleCheckout = async () => {
    try {
      if (!isLoggedIn) {
        // Redirect to the login page if the user is not logged in
        router.push('/signin');
        return;
      }
      // Call createOrder function before processing payment
      const amount = totalPrice

      if(deliveryAddress !== "" ){
        setLoading(true)

        await axios.post('/api/paystack', {   cartItems,
             amount,
             email: user.email,
             deliveryAddress: deliveryAddress,
             
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
      }
      else{
        toast.error('Please add an address to proceed with checkout')
      }
      // Call Paystack API to initiate payment

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
            <CartProduct item={item} key={item?._id} />
          ))}
        </div>

  <form action="">
    <div className="form-group flex flex-col">
      <label>Delivery Address</label>
      <input onChange={(e)=> setDeliveryAddress(e.target.value)} type="text" className="form-control outline-none border px-3 py-4" />
    </div>
    <div className="form-group flex flex-col">
      <label>Email Address</label>
      <input readOnly defaultValue={user?.email} onChange={()=> setEmailAddress(e.target.value)} type="text" className="form-control py-4 px-3 outline-none border " />
    </div>
  </form>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>{formatCurrency(totalPrice)}</h3>
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