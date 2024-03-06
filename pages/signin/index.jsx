import React from 'react';

import { useState } from 'react';
import axios from 'axios';
import { scrollToTop } from '../../hooks/useScrollToTop';
import { useRouter } from 'next/router';
import CircularSpinner from '../../components/spinner/CircularSpinner';
import { Cookies } from "react-cookie";
import { getNextMonth } from '../../lib/utils';
import { handleGenericError } from '../../hooks/mixin';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const cookies = new Cookies();

const router = useRouter()
  const handleSignin = async () => {
    const expiringDate = getNextMonth();

    try {
      setLoading(true)

      const response = await axios.post('/api/signin', { email, password });
      console.log(response.data);
      setLoading(false)
      setSuccess('Login successful')

      cookies.set("GC_user", response?.data?.user, {
        path: "/",
        secure: true,
        sameSite: "lax",
        expires: expiringDate,
      });
      cookies.set("GC_token", response?.data?.token, {
        path: "/",
        secure: true,
        sameSite: "lax",
        expires: expiringDate,
      });
  router.push('/')
    } catch (error) {
      const errMsg = handleGenericError(error)
      setError(errMsg)
      setLoading(false)

    }
  };

  setTimeout(()=>{
    setSuccess("")
    setError(null)
    }, 8000 )
  return (
    <div className='mx-auto w-2/6 flex shadow-xl flex-col gap-4 h-[40vh]  m-auto rounded-xl p-4 '>
    {error && <p className='text-red-500 text-end'>{error}</p>}
    {success && <p className='text-green-500 text-end'>{success}</p>}
    <h1 className='text-3xl font-bold text-center'>Welcome back!</h1>
    <div className="flex flex-col gap-4">
    <input type="text" placeholder="Email" className='border p-3 rounded-xl' value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" className='border p-3 rounded-xl' value={password} onChange={(e) => setPassword(e.target.value)} />

    </div>
    <button
      className={`border  rounded-xl bg-black h-14  text-white text-xl relative ${loading ? 'cursor-not-allowed' : ''}`}
      onClick={handleSignin}
      disabled={loading} // Disable the button when loading is true
    >
      {loading ? (
       <CircularSpinner />
      ) :
      "Sign in"
    
    }
      {/* {loading ? 'Loading...' : 'Signup'} */}
    </button>    <p className="text-center font-medium mt-5">
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
