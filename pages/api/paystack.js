// pages/api/createOrder.js
import Paystack from 'paystack';
import { createOrder } from '../../lib/client';
import {  initializePaystack } from '../../lib/paystack';

const paystackInstance = Paystack(process.env.PAYSTACK_SECRET_KEY);

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



export const verifyPayment = async (reference) => {
  try {
    const response = await paystackInstance.transaction.verify(reference);
    console.log('Paystack Verification Response:', response);

    // Check the payment status in the response
    if (response.data.status === 'success') {
      // Payment is successful

      return true;
    } else {
      // Payment failed
      return false;
    }
  } catch (error) {
    console.error('Paystack Verification Error:', error);
    throw error;
  }
};