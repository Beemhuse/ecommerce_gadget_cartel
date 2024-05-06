// // pages/api/createOrder.js
import { createOrder, createTransaction } from "../../lib/client";
import { initializePaystack } from "../../lib/paystack";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { cartItems, amount, email, note, phone, deliveryAddress, id } = req.body;
console.log("Request Body:", req.body);
    const paymentResponse = await initializePaystack(email, amount);
    const transactionRef = paymentResponse?.data.reference;
    const order = await createOrder(
      cartItems,
      amount,
      email,
      deliveryAddress,
      transactionRef,
      note,
      phone
    );

    if (order?._id) {
      const transaction = await createTransaction(
        order,
        amount,
        email,
        deliveryAddress,
        transactionRef,
        id,
        'pending', // Set default status to 'pending' or adjust as needed
      );

      return res.status(200).json({ success: true, order, transaction, paymentResponse });
    } else {
      return res.status(500).json({ error: 'Error creating order' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}