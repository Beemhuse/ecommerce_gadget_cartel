// pages/api/createOrder.js
import { createOrder } from '../../lib/client';
import {  initializePaystack } from '../../lib/paystack';



export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { cartItems, amount, email, location, deliveryAddress } = req.body;

    // Your logic to create an order in Sanity

    const order = await createOrder(cartItems, amount, email, location, deliveryAddress)

    const paymentResponse = await initializePaystack(email, amount);
    console.log("payment response ==>", paymentResponse)


    return res.status(200).json({ success: true, order, paymentResponse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}



