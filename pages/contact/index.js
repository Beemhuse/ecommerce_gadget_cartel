import React, { useState } from 'react';
import axios from 'axios';

export default function index() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/contact', formData);
      console.log('Contact form submitted:', response.data);
      // Optionally, you can display a success message or redirect the user after successful form submission
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Handle error state (e.g., display error message to the user)
    }
  };

  return (
    <>
      <h1 className='font-bold text-3xl text-center my-8 border-b-2 py-3 mx-auto'>Contact us</h1>
      <div className='flex items-center justify-between px-[6rem]'>
        <form className='w-2/5 m-auto' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
            <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md
              focus:outline-none focus:border-indigo-500" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md
              focus:outline-none focus:border-indigo-500" placeholder="Your Email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-semibold">Message</label>
            <textarea id="message" name="message" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md
              focus:outline-none focus:border-indigo-500" placeholder="Your Message" required value={formData.message} onChange={handleChange}></textarea>
          </div>
          <div className="mt-4">
            <button type="submit" className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md
              hover:bg-black transition duration-300">Send Message</button>
          </div>
        </form>

        <div className='w-2/4'>
          <h2 className='text-center text-3xl my-5 font-bold'>We Want to Hear From You</h2>
          <p>Your feedback matters to us. Whether you have a question, suggestion, or just want to say hi, we're all ears. Get in touch with us today, and let's start a conversation.</p>
        </div>
      </div>
    </>
  );
}
