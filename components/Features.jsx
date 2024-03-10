import React from 'react'
import { FaOpencart } from "react-icons/fa6";
import { FiAward } from "react-icons/fi";
import { CiShoppingTag } from "react-icons/ci";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaTruck, FaShieldAlt, FaGift, FaCreditCard } from 'react-icons/fa';

const features = [
    { title: 'FAST DELIVERY', content: 'Experience the swiftness of our delivery service.', icon: <FaTruck /> },
    { title: 'QUALITY GUARANTEE', content: 'Our commitment to quality ensures every product surpasses excellence.', icon: <FaShieldAlt /> },
    { title: '100% SECURE PAYMENT', content: 'Shop with confidence knowing your payments are 100% secure.', icon: <FaCreditCard /> },
  ];
export default function Features() {
  return (
    <div className='grid xl:w-5/6 w-full grid-cols-1 xl:grid-cols-3 mx-auto  gap-6 my-[80px]'>
       {features.map((feature, index) => (
        <div key={index} className='text-2xl xl:w-5/6 w-full p-3 mx-auto  flex  items-start gap-4 hover:border-r-4 hover:border-[#F02D34]'>
         <div className="text-3xl text-[#F02D34]">

          {feature.icon}
         </div>
          <div className="div">
          <h3 className='font-bold '>{feature.title}</h3>
          <p className='text-xl text-gray-400'>{feature.content}</p>

          </div>
        </div>
      ))}
    </div>
  )
}
