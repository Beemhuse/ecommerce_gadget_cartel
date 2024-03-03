import Paystack from 'paystack';

const paystackInstance = Paystack(process.env.PAYSTACK_SECRET_KEY);

export const verifyPayment = async (reference) => {
    try {
      const response = await paystackInstance.transaction.verify(reference);
      console.log('Paystack Verification Response:', response);
  
      // Check the payment status in the response
      if (response.data.status === 'success') {
        // Payment is successful
  
        // return true;
        return response.data;
      } else {
        // Payment failed
        // return false;
        return response.data;
      }
    } catch (error) {
      console.error('Paystack Verification Error:', error);
      throw error;
    }
  };