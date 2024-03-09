import Link from "next/link";
import React from "react";
import {
  AiFillInstagram,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" mt-auto text-black mt-8">
      <div className="grid grid-cols-3 w-4/5 mx-auto">
        <div className="div">
          <h2 className="text-2xl">Gadget Cartel</h2>
          <p className="text-gray-400 mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis{" "}
          </p>
          <div className="flex items-center gap-4 text-gray-400 mt-5 ">
            <AiFillInstagram className="hover:text-black cursor-pointer" />
            <AiOutlineTwitter className="hover:text-black cursor-pointer" />
            <AiOutlineInstagram className="hover:text-black cursor-pointer" />
          </div>
        </div>

        <div className="div">
          <h2 className="text-2xl">Quick Links</h2>
          <div className="flex flex-col gap-2 mt-4 items-start">
            <Link href={"/collections"}>Collections</Link>
            <Link href={"/products"}>Products</Link>
            <Link href={"/contact"}>Contact us</Link>
            <Link href={"/about"}>About us</Link>
          </div>
        </div>
        <div className="div">
          <h2 className="text-2xl">Contact Us</h2>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-gray-400">
              Do you have any queries or suggestions?
            </p>
            <a href="">gadgetcartel@gmail.com</a>

            <p className="text-gray-400">
              If you need support? Just give us a call.{" "}
            </p>
            <p>+234 1222 333 44</p>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-around">
        <p className="flex items-center gap-1">
          {" "}
          <span> Payment: </span> <FaCcVisa /> <FaCcMastercard />{" "}
        </p>
        <p>All rights reserved copyright {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
