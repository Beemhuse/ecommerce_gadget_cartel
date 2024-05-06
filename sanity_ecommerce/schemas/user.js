import { v4 as uuidv4 } from 'uuid';
export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      // hidden: true, // Hide the ID field in the Sanity Studio
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  initialValue: () => ({
    id: uuidv4(), // Generate a UUID for the ID field
  }),
};
