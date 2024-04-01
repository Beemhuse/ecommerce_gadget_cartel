
export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  readOnly: true, // Make the entire document read-only
  fields: [
    {
      name: 'orderId', // Add the _id field
      title: 'Order Number', // Change to Order Number for clarity
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Customer',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'cartItems',
      title: 'Order Items',
      type: 'array',
      of: [{ type: 'product' }], 
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'amount',
      title: 'Total Amount (N)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'status',
      title: 'Payment Status',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Delivery Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'deliveryAddress',
      title: 'Delivery Address',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'transactionDate',
      title: 'Order Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      email: 'email',
      deliveryAddress: 'deliveryAddress',
    },
    prepare(selection) {
      const { email, deliveryAddress } = selection;
      return {
        title: email, // Display email as the title
        subtitle: `Delivery Address: ${deliveryAddress}`, // Display delivery address as the subtitle
      };
    },
  },
};
