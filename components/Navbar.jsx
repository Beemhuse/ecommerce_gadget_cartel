import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineMenu } from "react-icons/ai";

import { Cart } from "./";
// import { useStateContext} from '../context/StateContext';
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/reducers/cartReducer";
import { useRouter } from "next/router";
import { Drawer } from "@mui/joy";

const navigationLinks = [
  { path: "/", label: "Home" },
  { path: "/collections", label: "Collections" },
  { path: "/products", label: "Products" },
  { path: "/about", label: "About us" },
  { path: "/contact", label: "Contact us" },
  // Add more navigation items as needed
];

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { showCart,  totalQuantities } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const handleShowCart = () => {
    dispatch(toggleCart());
  };
  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(inOpen);
  };
  return (
    <div className="flex justify-between text-black shadow-md   items-center mb-8 py-5 p-2 top-0 w-full bg-white px-8 ">
      <p className=" xl:w-2/3 text-white">
        <Link href="/"> <img src="/gadget_logo.jpg" width={80} height={80} alt="logo" /> </Link> 
      </p>
      <ul className="xl:flex hidden  items-center gap-6 w-full  justify-center">
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

         

      <div className="flex   items-center text-black gap-4 w-2/3  justify-end ">
        <Link href={"/orders"} className="xl:flex hidden  ">View orders</Link>
        <button type="button" className="cart-icon" onClick={handleShowCart}>
          <span className="cart-item-qty">{totalQuantities}</span>
          <AiOutlineShopping />
        </button>
          {/* Hamburger Menu Icon */}
          <div className="block xl:hidden text-white">
        <button onClick={toggleDrawer(true)}>
          <AiOutlineMenu className="text-2xl text-black" />
        </button>
      </div>
      </div>

      {showCart && <Cart />}

         {/* Mobile Navigation */}
         <Drawer
          anchor={"right"}
          open={open}
          color="neutral"
          variant="plain"
                    onClose={toggleDrawer(false)}        >
                      
            <div className="w-full  text-black mt-[50px]">
          <ul className="flex flex-col items-center gap-4">
            {navigationLinks.map((link) => (
              <li key={link.path} className="mb-2">
                <Link href={link.path}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/collections">Collections</Link>
            </li>
            <li>
              <Link href="/orders">View Orders</Link>
            </li>
          </ul>
        </div>
        </Drawer>
    
    </div>
  );
};

export default Navbar;
