// pages/orders.js
import React, { useEffect, useState } from 'react';
import { client } from '../../lib/client';
import Link from 'next/link';
import OrderTable from '../../components/table/OrderTable';
// import sanityClient from '../lib/sanityClient';
import { FcNext, FcPrevious } from "react-icons/fc";

const OrdersPage = ({ orders, totalPages, currentPage }) => {
  return (
    <div className="px-[50px]">
      <h1 className='text-center font-bold text-2xl my-8'>All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        <>
        <OrderTable orders={orders} />
     
        <div className="flex justify-center items-center mt-8 gap-4">
{currentPage > 1 && (
    <Link href={`/orders?page=${currentPage - 1}`} className={'text-xl'}>
      <button><FcPrevious /></button>
    </Link>
  )}
<span className={'text-xl'}>

{currentPage}
</span>

  {currentPage < totalPages && (
    <Link href={`/orders?page=${currentPage + 1}`} className={'text-xl'}>
      <button><FcNext /></button>
    </Link>
  )}
</div>

        </>
      )}
    </div>
  );
};

export default OrdersPage;
export async function getServerSideProps({ query }) {
    try {
      const page = parseInt(query.page) || 1;
      const pageSize = 10; // Set your desired page size
  
      // Calculate skip value for pagination
      const skip = (page - 1) * pageSize;
  
      // Fetch orders data from Sanity with pagination
      const orders = await client.fetch(`
        *[_type == "order"] | order(_createdAt desc) [${skip}...${skip + pageSize - 1}] {
          _id,
          email,
          amount,
          cartItems
        }
      `);
  
      // Fetch total number of orders for calculating total pages
      const totalOrders = await client.fetch(`
        count(*[_type == "order"])
      `);
  
      const totalPages = Math.ceil(totalOrders / pageSize);
  
      return {
        props: {
          orders,
          totalPages,
          currentPage: page,
        },
      };
    } catch (error) {
      console.error('Error fetching orders from Sanity:', error);
  
      return {
        props: {
          orders: [],
          totalPages: 0,
          currentPage: 1,
        },
      };
    }
  }
