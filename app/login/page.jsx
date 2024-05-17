/* eslint-disable react/no-unescaped-entities */
"use client"
import styles from './login.module.css';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
const Login = () => {
  const [info, setInfo] = useState({email:"", password:""});
  const router = useRouter();
  const [pending, setPending] = useState(false);

  
  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value}));
  }
   async function handleSubmit(e) {
   e.preventDefault();
   localStorage.setItem("users", JSON.stringify(info));
   if(!info.email || !info.password) {
    toast.error("Must provider all the credentials.")
   } else {
   try {
    setPending(true);
    localStorage.setItem("users", JSON.stringify(info));

    const res = await signIn("credentials", {
      email: info.email,
      password: info.password,
      redirect: false
    })
    if(res.error) {
      toast.error("Invalid Credentials")
      setPending(false);
      return;
    }
    router.replace("/");
  
   } catch (error) {
  setPending(false);
  toast.error("Something Went Wrong!.")
   }
  }}
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className="text-[17px] mb-3 font-[500]">Login</h2>
        {pending && <span className={styles.loading}>Loading...</span>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handleInput(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleInput(e)}
        />
        <button>Login</button>

        <div className={styles.logintitle}>
          <span className={styles.account}>
            Don't have an account ? <Link href="/register">Register</Link>
          </span>
          <span className={styles.forgetpassword}>
          <Link href="/forgetpassword">Forget password ?</Link>
             </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
