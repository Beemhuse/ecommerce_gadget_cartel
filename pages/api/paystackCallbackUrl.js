// pages/api/paystackCallback.js

import { verifyPayment } from "./paystack";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { reference } = req.body;

    // Verify the payment using the reference from the callback
    const paymentStatus = await verifyPayment(reference);

    if (paymentStatus) {
      // Payment is successful, handle it as needed (e.g., update order status in your database)
      console.log('Payment successful for reference:', reference);

      // Redirect to the success page on the frontend
      res.writeHead(302, { Location: '/success' }); // Replace '/success' with your actual success page path
      res.end();
    } else {
      // Payment failed, handle it as needed
      console.log('Payment failed for reference:', reference);
      return res.status(400).json({ success: false, error: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error processing Paystack callback:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
