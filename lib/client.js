import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '3823yhk4',
  dataset: 'production',
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
    console.log('User saved to Sanity:', sanityResponse);
    return sanityResponse;
  } catch (sanityError) {
    console.error('Error saving user to Sanity:', sanityError);
    return { error: 'Internal Server Error', message: sanityError.message };
  }
};


const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);


export const createOrder = async (
  cartItems,
  amount,
  email,
  location,
  deliveryAddress,
  transactionRef,
  status = 'pending' // Default value is 'pending'
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
      location,
      deliveryAddress,
      transactionRef,
      status, // Set the transactionStatus, default is 'pending'

    });

    console.log('Order saved to Sanity:', order);
    return order;
  } catch (sanityError) {
    console.error('Error saving order to Sanity:', sanityError);
    return { error: 'Internal Server Error', message: sanityError.message };
  }
};
