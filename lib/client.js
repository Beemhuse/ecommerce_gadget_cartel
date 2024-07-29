import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '3823yhk4',
  dataset: 'gadgetcartel',
  apiVersion: '2024-01-27',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

export const getUserByEmail = async (email) => {
  const query = '*[_type == "user" && email == $email][0]';
  const params = { email };

  try {
    const user = await client.fetch(query, params);
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};


export const createUser = async (user) => {
  try {
    const sanityResponse = await client.create({ _type: 'user', ...user });
    return sanityResponse;
  } catch (sanityError) {
    return { error: 'Internal Server Error', message: sanityError.message };
  }
};


const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source?.asset?._ref) {
    return ''; // Return an empty string or a placeholder URL if there's no asset
  }
  return builder.image(source);
};


export const createOrder = async (
  cartItems,
  amount,
  email,
  deliveryAddress,
  transactionRef,
  note,
  phone
) => {
  const cartItemsWithKeys = cartItems.map((item, index) => ({
    ...item,
    _key: `orderedItem_${index}`,
  }))

  try {
    // Your logic to create an order document in Sanity
    const order = await client.create({
      _type: 'order',
      cartItems: cartItemsWithKeys,
      amount,
      email,
      deliveryAddress,
      transactionDate: new Date(), // Use current date for transactionDate
      transactionRef,
      note,
      phone
    });
    await client.patch(order._id).set({ orderId: order._id }).commit();

    console.log('Order saved to Sanity:', order);
    return order;
  } catch (sanityError) {
    console.error('Error saving order to Sanity:', sanityError);
    return { error: 'Internal Server Error', message: sanityError.message };
  }
};

export const createTransaction = async (
  order,
  amount,
  email,
  deliveryAddress,
  transactionRef,
  id,
  status = 'pending', // Default value is 'pending'
) => {
  
  try {
    // Your logic to create a transaction document in Sanity
    const transaction = await client.create({
      _type: 'transaction',
      order: {
        _type: 'reference',
        _ref: order._id, // Assuming order._id is the Sanity document ID of the order
      },
      amount,
      email,
      deliveryAddress,
      transactionRef,
      id,
      transactionDate: new Date(), // Use current date for transactionDate
      status,
    });

    console.log('Transaction saved to Sanity:', transaction);

    
    return transaction;
  } catch (sanityError) {
    console.error('Error saving transaction to Sanity:', sanityError);
    return { error: 'Internal Server Error', message: sanityError.message };
  }
};

export const getTransactionRefs = async () => {
  try {
    // Query Sanity to fetch all transactions and select the transactionRef field
    const transactions = await client.fetch(`*[_type == 'transaction']{transactionRef}`);

    // Extract and return an array of transactionRef values
    const transactionRefs = transactions.map(transaction => transaction.transactionRef);
    
    return transactionRefs;
  } catch (error) {
    console.error('Error fetching transaction references:', error);
    throw error;
  }
};
// Function to update transaction status in Sanity
// export const updateTransactionStatus = async (transactionRef, newStatus) => {
//   try {
//     // Fetch the transaction document from Sanity
//     const existingTransaction = await client.getDocument(transactionRef);

//     if (!existingTransaction) {
//       throw new Error(`Transaction with ID ${transactionRef} not found`);
//     }

//     // Update the status field with the new status value
//     const updatedTransaction = await client
//       .patch(transactionRef)
//       .set({ status: newStatus })
//       .commit();

//     return updatedTransaction;
//   } catch (error) {
//     console.error('Error updating transaction status:', error);
//     throw error; // Throw the error to handle it at a higher level if needed
//   }
// };


export const updateTransactionStatus = async (transactionRef, newStatus) => {
  try {
    // Query Sanity to fetch the transaction with the given transactionRef
    const transaction = await client.fetch(`*[_type == 'transaction' && transactionRef == $transactionRef][0]`, { transactionRef });

    // Check if transaction exists
    if (!transaction) {
      throw new Error(`Transaction with transactionRef ${transactionRef} not found`);
    }

    // Update the status field with the new status value
    const updatedTransaction = await client
      .patch(transaction._id) // Use the _id of the fetched transaction
      .set({ status: newStatus })
      .commit();

    return updatedTransaction;
  } catch (error) {
    console.error('Error updating transaction status:', error);
    throw error;
  }
};