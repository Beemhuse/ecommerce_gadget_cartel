// schema.js

export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    readOnly: true, // Make the entire document read-only
    fields: [
    {
      name: 'orderNumber',
      title: 'Order Id',
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
      // options: {  
      //   list: ['Pending', 'Failed', 'Success'],
      // },
      // validation: (Rule) => Rule.required(),
    },
    // {
    //   name: 'email',
    //   title: 'Customer Email',
    //   type: 'string',
    //   validation: (Rule) => Rule.required().email(),
    // },
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
      name: 'createdAt',
      title: 'Order Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
    preview: {
      select: {
        title: 'orderNumber',
        customers: 'customers.*.name',
        status: 'status',
        createdAt: '_createdAt',
      },
      prepare(selection) {
        const { title, customers, status, createdAt } = selection;
        return {
          title: `Order #${title}`,
          subtitle: `Customers: ${customers.join(', ')} | Status: ${status}`,
          description: `Placed on ${new Date(createdAt).toLocaleDateString()}`,
        };
      },
      // Only show the preview when the order status is 'Placed'
      filter: 'status == "Placed"',
    },
  };
  
  // ... (orderedItem and customer schemas)
  