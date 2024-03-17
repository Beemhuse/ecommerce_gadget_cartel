import React from "react";
import Table from "@mui/joy/Table";

export default function OrderTable({ orders }) {
    console.log(orders)
  return (
    <div >
      <Table aria-label="basic table" size="lg" stripe="odd" className="w-full overflow-scroll ">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Email</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order?._id}>
              <td>{order?._id}</td>
              <td>{order?.email}</td>
              <td>N{order?.amount}</td>
              {/* Add more cells based on your order schema */}
            </tr>
          ))}
        </tbody>
      </Table>
    
    </div>
  );
}
