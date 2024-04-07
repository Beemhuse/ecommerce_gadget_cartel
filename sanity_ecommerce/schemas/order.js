
export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  readOnly: true, // Make the entire document read-only
  fields: [
    {
      name: 'orderId', // Field for displaying _id
      title: 'Order ID',
      type: 'string',
      validation: Rule => Rule.required(), // You might want to adjust validation rules based on your requirements
      readOnly: true, // Make it read-only as _id is system-generated
      // hidden: true, // Hide it from the content editor UI
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
      title: 'Transaction Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      email: 'email',
      deliveryAddress: 'deliveryAddress',
      id: '_id', // Select _id field for display

    },
    prepare(selection) {
      const { email, deliveryAddress, id } = selection;
      return {
        title: email, // Display email as the title
        subtitle: `Order Number: ${id}\nDelivery Address: ${deliveryAddress}`, // Display order number and delivery address as the subtitle
      };
    },
  },
};
