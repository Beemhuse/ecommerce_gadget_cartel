import React from 'react';
// import Header from './Header'; // Import your Header component
import Footer from '../Footer';
import Head from 'next/head';
import { Navbar } from '..';

export default function GeneralLayout({ children }) {
  return (
    <div className='w-full min-h-screen flex flex-col'>
    <Head>
        <title>Gadget Cartel</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="">
        {children}
      </main>
      <Footer />
    </div>
  );
}
