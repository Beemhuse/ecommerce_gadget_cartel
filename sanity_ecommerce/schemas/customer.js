// schema.js

export default {
    name: 'customer',
    title: 'Customer',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Customer Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'email',
        title: 'Email',
        type: 'email',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'address',
        title: 'Address',
        type: 'text',
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
      },
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'email',
      },
    },
  };
  