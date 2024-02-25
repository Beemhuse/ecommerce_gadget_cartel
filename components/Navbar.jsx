import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
// import { useStateContext} from '../context/StateContext';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../store/reducers/cartReducer';
import { useRouter } from 'next/router';


const navigationLinks = [
  { path: '/collections', label: 'Collections' },
  { path: '/products', label: 'Products' },
  // Add more navigation items as needed
];

const Navbar = () => {
  // const { showCart, setShowCart, totalQuantities } = useStateContext();
  const router = useRouter();

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
      <ul className='flex items-center gap-6 w-full '>
      {navigationLinks.map((link) => (
            <li className={`border-b-2 border-transparent group-hover:border-red-500 ${router.pathname === link.path ? 'border-red-500' : ''}`}>
            <Link href={link.path}>
            {link.label}
          </Link>
        </li>
      ))}
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