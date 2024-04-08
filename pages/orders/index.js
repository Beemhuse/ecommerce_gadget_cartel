// pages/orders.js
import React, { useEffect, useState } from "react";
import { client } from "../../lib/client";
import Link from "next/link";
import OrderTable from "../../components/table/OrderTable";
import { FcNext, FcPrevious } from "react-icons/fc";

const OrdersPage = ({ transactions, totalPages, currentPage }) => {
  console.log(transactions)
  return (
    <div className="px-[50px]">
      <h1 className="text-center font-bold text-2xl my-8">All Transactions</h1>
      {transactions?.length === 0 ? (
        <p>No transactions available</p>
      ) : (
        <>
          <OrderTable orders={transactions} />
          <div className="flex justify-center items-center mt-8 gap-4">
            {currentPage > 1 && (
              <Link href={`/orders?page=${currentPage - 1}`} className={"text-xl"}>
                <button>
                  <FcPrevious />
                </button>
              </Link>
            )}
            <span className={"text-xl"}>{currentPage}</span>

            {currentPage < totalPages && (
              <Link href={`/orders?page=${currentPage + 1}`} className={"text-xl"}>
                <button>
                  <FcNext />
                </button>
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

    // Fetch transactions data from Sanity with pagination
    const transactions = await client.fetch(`
      *[_type == "transaction"] | order(_createdAt desc) [${skip}...${skip + pageSize - 1}] {
        _id,
        email,
        amount,
        deliveryAddress,
        status,
        transactionRef,
        transactionDate,
        order
      }
    `);
console.log(transactions)
    // Fetch total number of transactions for calculating total pages
    const totalTransactions = await client.fetch(`
      count(*[_type == "transaction"])
    `);

    const totalPages = Math.ceil(totalTransactions / pageSize);

    return {
      props: {
        transactions,
        totalPages,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Error fetching transactions from Sanity:", error);

    return {
      props: {
        transactions: [],
        totalPages: 0,
        currentPage: 1,
      },
    };
  }
}
