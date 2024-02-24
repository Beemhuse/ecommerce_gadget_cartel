import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
// import { useStateContext} from '../context/StateContext';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../store/reducers/cartReducer';

const Navbar = () => {
  // const { showCart, setShowCart, totalQuantities } = useStateContext();

  const { showCart, cartItems, totalPrice,  totalQuantities, qty } = useSelector((state) => state.cart);
const dispatch =useDispatch()
const handleShowCart =()=>{
  dispatch(toggleCart());

}
  
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Gadget Cartel</Link>
      </p>
      <ul className='flex items-center gap-6 w-full border border-red-500'>
        <Link href={"/collections"}>
          Collections
        </Link>
        <Link href={"/products"}>
          Products
        </Link>
      </ul>

      <button type="button" className="cart-icon" onClick={handleShowCart}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar