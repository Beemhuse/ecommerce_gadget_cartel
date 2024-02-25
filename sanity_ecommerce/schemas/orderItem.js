export const orderedItem = {
  name: 'orderedItem',
  title: 'Ordered Item',
  type: 'document',
  fields: [
    {
      name: 'key',
      title: 'Key',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Product Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'details',
      title: 'Product Details',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      details: 'details',
      _key: '_key',
    },
    prepare(selection) {
      const { title, price, details, _key } = selection;
      return {
        title,
        subtitle: `Price: ${price}, Details: ${details}, Key: ${_key}`,
      };
    },
  },
};
