import React, { useState } from "react";
import Table from "@mui/joy/Table";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import axios from "axios";

export default function OrderTable({ orders }) {
  const formatCurrency = useCurrencyFormatter("NGN")
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const useDateFormat = (dateString) => {
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return { backgroundColor: "#D1FAE5" }; // Green background for success status
      case "failure":
        return { backgroundColor: "#FEE2E2" }; // Red background for failure status
      case "pending":
        return { backgroundColor: "#FEF3C7" }; // Yellow background for pending status
      default:
        return {}; // Default background color
    }
  };
  const handleRowClick = async (id) => {
    console.log(id)
    try {
      const orderDetails = await axios.get(`/api/order/${id}`);
      console.log(orderDetails)
      setSelectedOrderDetails(orderDetails);
      // setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  console.log(orders)
  return (
    <div>
      <Table aria-label="basic table" size="lg" stripe="odd" className="w-full overflow-scroll">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Transaction Reference</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order?._id} onClick={() => handleRowClick(order?._id)}>
              <td>{order?._id}</td>
              <td>{order?.email}</td>
              <td>{formatCurrency(order?.amount)}</td>
              <td className="w-inherit" > <span style={getStatusColor(order?.status)} className="p-3 rounded-lg">{order?.status} </span> </td>
              <td>{order?.transactionRef}</td>
              <td>{useDateFormat(order?.transactionDate)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
