// // pages/api/createOrder.js
import { createOrder } from "../../lib/client";
import { initializePaystack } from "../../lib/paystack";
// import { verifyPaystackPayment } from './verify';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { cartItems, amount, email, location, deliveryAddress } = req.body;

    const paymentResponse = await initializePaystack(email, amount);
    const transactionRef = paymentResponse.reference;

    const order = await createOrder(
      cartItems,
      amount,
      email,
      location,
      deliveryAddress,
      transactionRef,
    );

    return res.status(200).json({ success: true, order, paymentResponse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}


