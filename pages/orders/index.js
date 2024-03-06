// pages/orders.js
import React, { useEffect, useState } from 'react';
import { client } from '../../lib/client';
import Link from 'next/link';
// import sanityClient from '../lib/sanityClient';

const OrdersPage = ({ orders, totalPages, currentPage }) => {
  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        <>
        
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Email</th>
              <th>Amount</th>
              {/* Add more columns based on your order schema */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.email}</td>
                <td>${order.amount}</td>
                {/* Add more cells based on your order schema */}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
{currentPage > 1 && (
    <Link href={`/orders?page=${currentPage - 1}`}>
      <button>&lt;</button>
    </Link>
  )}

  {Array.from({ length: totalPages }, (_, index) => (
    <Link href={`/orders?page=${index + 1}`} key={index + 1}>
      <button className={currentPage === index + 1 ? 'active' : ''}>
        {index + 1}
      </button>
    </Link>
  ))}

  {currentPage < totalPages && (
    <Link href={`/orders?page=${currentPage + 1}`}>
      <button>&gt;</button>
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
          // Add more fields based on your order schema
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
