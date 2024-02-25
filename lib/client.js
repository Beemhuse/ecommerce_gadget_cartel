import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '3823yhk4',
  dataset: 'production',
  apiVersion: '2024-01-27',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);


export const createOrder = async (cartItems, amount, email, location, deliveryAddress, transactionRef) => {

  const cartItemsWithKeys = cartItems.map((item, index) => ({
    ...item,
    _key: `orderedItem_${index}`,
  }));
  // Your logic to create an order document in Sanity
  const order = await client.create({
    _type: 'order',
    cartItems: cartItemsWithKeys,
    amount,
    email,
    location,
    deliveryAddress,
    orderNumber: transactionRef

    // Include other fields as needed
  });

  return order;
};