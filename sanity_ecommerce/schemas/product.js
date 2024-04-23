export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      }
    },
    { 
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),

    },
    { 
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),

      // hidden: ({ parent }) => parent || parent._type !== 'array' || parent.of[0]._type !== 'product',

      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    { 
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),

    },
    { 
      name: 'details',
      title: 'Details',
      type: 'string',
      validation: (Rule) => Rule.required(),

    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      // hidden: ({ parent }) => !parent || parent._type !== 'array' || parent.of[0]._type !== 'product',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },

  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },

}