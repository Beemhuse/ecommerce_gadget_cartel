// pages/orders.js
import React, { useEffect, useState } from "react";
import { client } from "../../lib/client";
import Link from "next/link";
import OrderTable from "../../components/table/OrderTable";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Cookies } from "react-cookie";

const OrdersPage = ({ transactions, totalPages, currentPage }) => {

  const cookies = new Cookies();
  const user = cookies.get("GC_user");

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

export async function getServerSideProps({ req, query }) {
  try {
    const page = parseInt(query.page) || 1;
    const pageSize = 10; // Set your desired page size

    // Get the currently authenticated user's ID or email from the request
    const cookies = new Cookies(req.headers.cookie);
    const user = cookies.get("GC_user");
const userId = user.id
    if (!userId) {
      throw new Error("User not authenticated");
    }
    console.log(userId)
    
    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;

    // Fetch transactions data for the authenticated user with pagination
    const transactions = await client.fetch(`
      *[_type == "transaction" && id == "${userId}"] | order(_createdAt desc) [${skip}...${skip + pageSize - 1}] {
        _id,
        email,
        amount,
        deliveryAddress,
        status,
        transactionRef,
        transactionDate,
        order,
        id

      }
    `);

    // Fetch total number of transactions for the authenticated user for calculating total pages
    const totalTransactions = await client.fetch(`
      count(*[_type == "transaction" && email == "${userId}"])
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
