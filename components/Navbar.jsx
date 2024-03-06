import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
// import { useStateContext} from '../context/StateContext';
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/reducers/cartReducer";
import { useRouter } from "next/router";

const navigationLinks = [
  { path: "/collections", label: "Collections" },
  { path: "/products", label: "Products" },
  // Add more navigation items as needed
];

const Navbar = () => {
  // const { showCart, setShowCart, totalQuantities } = useStateContext();
  const router = useRouter();

  const { showCart, cartItems, totalPrice, totalQuantities, qty } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const handleShowCart = () => {
    dispatch(toggleCart());
  };

  return (
    <div className="navbar-container  mb-8 py-5 p-2  px-4  bg-black">
      <p className=" xl:w-2/3 text-white">
        <Link href="/">Gadget Cartel</Link>
      </p>
      <ul className="flex text-white items-center gap-6 w-full  justify-center">
        {navigationLinks.map((link) => (
          <li
            className={`border-b-2 border-transparent group-hover:border-red-500 ${
              router.pathname === link.path ? "border-red-500" : ""
            }`}
          >
            <Link href={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center text-white gap-4 w-2/3  justify-end ">
        <Link href={"/orders"}>View orders</Link>
        <button type="button" className="cart-icon" onClick={handleShowCart}>
          <span className="cart-item-qty">{totalQuantities}</span>
          <AiOutlineShopping />
        </button>
      </div>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
