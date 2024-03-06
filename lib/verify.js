import axios from "axios";

export const verifyPaystackPayment = async (transactionRef) => {
  console.log(transactionRef)
  try {
    const paystackApiUrl = `https://api.paystack.co/transaction/verify/${transactionRef}`;
    const response = await axios.get(paystackApiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
      },
    });
console.log("verify payment", response)
    const responseData = response.data;

    if (responseData.status === false && responseData.message === 'Transaction reference not found') {
      // Handle the specific error case
      console.error('Transaction reference not found:', responseData.message);
      return false;
    }

    if (responseData.status === true && responseData.data.status === 'success') {
      return true; // Payment is successfully verified
    }

    return false; // Payment verification failed
  } catch (error) {
    console.error('Error verifying Paystack payment:', error);
    throw error;
  }
};