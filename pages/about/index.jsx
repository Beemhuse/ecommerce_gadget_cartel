import React from 'react'
import Head from 'next/head';

const index = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>About Us - Gadget Store</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
        <div className="flex justify-center items-center mb-8">
          <img src="/gadget_logo.jpg" alt="Gadget Store Logo" className="h-16 w-16 mr-2" />
          <h2 className="text-xl font-semibold">Gadget Store</h2>
        </div>
        <p className="text-gray-700 text-center mb-8">
          Welcome to Gadget Store, your number one source for all things gadgets. We're dedicated to providing you the best of gadgets, with a focus on dependability, customer service, and uniqueness.
        </p>
        <div className="flex justify-center mb-8">
          <img src="/assets/headphones_a_1.webp" alt="Smartphone Illustration" className="h-24 w-24 mx-2" />
          <img src="/assets/watch_4.webp" alt="Tablet Illustration" className="h-24 w-24 mx-2" />
        </div>
        <p className="text-gray-700 text-center">
          We're working to turn our passion for gadgets into a booming online store. We hope you enjoy our products as much as we enjoy offering them to you.
        </p>
      </div>
      <form action="">
        
      </form>
    </div>
  );
};

export default index;
