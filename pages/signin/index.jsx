import React from 'react';

import { useState } from 'react';
import axios from 'axios';
import { scrollToTop } from '../../hooks/useScrollToTop';
import { useRouter } from 'next/router';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const router = useRouter()
  const handleSignin = async () => {
    try {
      const response = await axios.post('/api/signin', { email, password });
      console.log(response.data);
    } catch (error) {
      console.error('Signin error:', error);
    }
  };

  return (
    <div className='mx-auto w-2/6 flex shadow-xl flex-col gap-4 h-[40vh]  m-auto rounded-xl p-4 '>
    <h1 className='text-3xl font-bold text-center'>Welcome back!</h1>
    <div className="flex flex-col gap-4">
    <input type="text" placeholder="Email" className='border p-3 rounded-xl' value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" className='border p-3 rounded-xl' value={password} onChange={(e) => setPassword(e.target.value)} />

    </div>
    <button className='border p-3 rounded-xl bg-black  text-white text-xl' onClick={handleSignin}>Signin</button>
    <p className="text-center font-medium mt-5">
        Don't have an account?{' '}
        <span
          onClick={() => {
            scrollToTop();
            router.push('/signup')
          }}
          className="text-[#8E0789] cursor-pointer"
        >
          Sign up
        </span>{' '}
      </p>    </div>
  );
};

export default Signin;
