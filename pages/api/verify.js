import {  updateTransactionStatus } from '../../lib/client';
import { verifyPaystackPayment } from '../../lib/verify';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { trxref } = req.query;

    const isPaymentVerified = await verifyPaystackPayment(trxref);

    console.log(isPaymentVerified)
    const newStatus = isPaymentVerified ? 'success' : 'failure';

    await updateTransactionStatus(trxref, newStatus);

    if (!isPaymentVerified) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    // If payment is verified, update the transaction status in Sanity

    return res.status(200).json({ success: true, message:"Payment verified" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
