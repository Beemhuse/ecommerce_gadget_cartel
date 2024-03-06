// pages/signup.js
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { scrollToTop } from "../../hooks/useScrollToTop";
import { Cookies } from "react-cookie";
import { handleGenericError } from "../../hooks/mixin";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')
  const cookies = new Cookies();

  const handleSignup = async () => {
    try {
      const response = await axios.post("/api/signup", { email, password });
      console.log(response.data);
      cookies.set("GC_user", response?.data?.data, {
        path: "/",
        secure: true,
        sameSite: "lax",
        // expires: expiringDate,
      });
      cookies.set("GC_token", response?.data?.token, {
        path: "/",
        secure: true,
        sameSite: "lax",
        // expires: expiringDate,
      });
  
      localStorage.setItem('token', response.data.token)
    } catch (error) {
        const errMsg = handleGenericError(error)
        setError(errMsg)
      console.error("Signup error:", errMsg);
    }
  };
setTimeout(()=>{

}, 5000 )
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
        className="border p-3 rounded-xl bg-black  text-white text-xl"
        onClick={handleSignup}
      >
        Signup
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
