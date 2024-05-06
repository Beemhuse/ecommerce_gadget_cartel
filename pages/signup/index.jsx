// pages/signup.js
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { scrollToTop } from "../../hooks/useScrollToTop";
import { handleGenericError } from "../../hooks/mixin";
import CircularSpinner from "../../components/spinner/CircularSpinner";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);


  const handleSignup = async () => {
    try {
        setLoading(true)
      const response = await axios.post("/api/signup", { email, password });
      console.log(response.data);
      
      setLoading(false)
      localStorage.setItem('token', response.data.token)
      router.push("/signin");
    } catch (error) {
        setLoading(false)

        const errMsg = handleGenericError(error)
        setError(errMsg)
      console.error("Signup error:", errMsg);
    }
  };
setTimeout(()=>{
setError(null)
}, 8000 )
  return (
    <div className="mx-auto w-2/6 flex shadow-xl flex-col gap-4 h-[40vh]  m-auto rounded-xl p-4 ">
      <h1 className="text-3xl font-bold text-center">Get Started</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
      className={`border  rounded-xl bg-black h-14  text-white text-xl relative ${loading ? 'cursor-not-allowed' : ''}`}
      onClick={handleSignup}
      disabled={loading} // Disable the button when loading is true
    >
      {loading ? (
       <CircularSpinner />
      ) :
      "Signup"
    
    }
      {/* {loading ? 'Loading...' : 'Signup'} */}
    </button>
      <p className="text-center font-medium mt-5">
        Already have an account?{" "}
        <span
          onClick={() => {
            scrollToTop();
            router.push("/signin");
          }}
          className="text-[#8E0789] cursor-pointer"
        >
          Sign in
        </span>{" "}
      </p>{" "}
    </div>
  );
};

export default Signup;
