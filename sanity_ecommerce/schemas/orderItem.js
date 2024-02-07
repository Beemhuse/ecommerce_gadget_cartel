// schema.js

export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'orderNumber',
        title: 'Order Number',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'customer',
        title: 'Customer',
        type: 'reference',
        to: [{ type: 'customer' }],
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'items',
        title: 'Ordered Items',
        type: 'array',
        of: [{ type: 'orderedItem' }],
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'totalAmount',
        title: 'Total Amount',
        type: 'number',
        validation: (Rule) => Rule.required().min(0),
      },
      {
        name: 'status',
        title: 'Order Status',
        type: 'string',
        options: {
          list: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        },
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
        customer: 'customer.name',
        status: 'status',
        createdAt: 'createdAt',
      },
      prepare(selection) {
        const { title, customer, status, createdAt } = selection;
        return {
          title: `Order #${title}`,
          subtitle: `Customer: ${customer} | Status: ${status}`,
          description: `Placed on ${new Date(createdAt).toLocaleDateString()}`,
        };
      },
    },
  }
  
  

  export const orderedItem = {
    name: 'orderedItem',
    title: 'Ordered Item',
    type: 'object',
    fields: [
      {
        name: 'product',
        title: 'Product',
        type: 'reference',
        to: [{ type: 'product' }],
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'quantity',
        title: 'Quantity',
        type: 'number',
        validation: (Rule) => Rule.required().min(1),
      },
    ],
  };