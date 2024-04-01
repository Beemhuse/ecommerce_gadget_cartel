// schemas/transaction.js

export default {
    name: 'transaction',
    title: 'Transaction',
    type: 'document',
    fields: [
      {
        name: 'orderNumber',
        title: 'Reference',
        type: 'string',
        description: 'Transaction reference or ID',
      },
      {
        name: 'amount',
        title: 'Amount',
        type: 'number',
        description: 'Transaction amount',
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        description: 'Transaction status',
        options: {
          list: ['pending', 'completed', 'failed'],
        },
      },
    ],
  };
  