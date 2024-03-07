import { createOrder } from '../../lib/client';
import { verifyPaystackPayment } from '../../lib/verify';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { trxref } = req.query;

    const isPaymentVerified = await verifyPaystackPayment(trxref);

    if (!isPaymentVerified) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    const transactionRef = trxref
    // If payment is verified, create the order in Sanity
    const order = await createOrder(cartItems, amount, email, location, deliveryAddress, transactionRef, "success");

    return res.status(200).json({ success: true, order, message:"Payment verified" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
