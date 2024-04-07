// transactions.js

export default {
  name: 'transaction',
  title: 'Transaction',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'reference',
      to: [{ type: 'order' }],
    },
    {
      name: 'amount',
      title: 'Amount',
      type: 'number',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
 
    {
      name: 'deliveryAddress',
      title: 'Delivery Address',
      type: 'string',
    },
    {
      name: 'transactionRef',
      title: 'Transaction Reference',
      type: 'string',
    },
    {
      name: 'transactionDate',
      title: 'Transaction Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Payment Status',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    // Add more fields as needed, such as status, timestamps, etc.
  ],
  preview: {
    select: {
      order: 'order.orderId',
      amount: 'amount',
      email: 'email',
      ref: "transactionRef"
    },
    prepare(selection) {
      const { order, amount, email, ref } = selection;
      return {
        title: `Ref: ${ref}, Amount: ${amount}`,
        subtitle: `Email: ${email}`,
      };
    },
  },
};
