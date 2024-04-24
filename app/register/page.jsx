"use client"
import React, { useState } from 'react'
import styles from './register.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

const Register =  () => {
 const [info, setInfo] = useState({username:"", email:"", password:""});
 const router = useRouter();
 const [pending, setPending] = useState(false);
 function handleInput(e) {
   setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value}));
 }
  async function handleSubmit(e) {
  e.preventDefault();
  if(!info.username || !info.email || !info.password) {
   toast.error("Must provider all the credentials.")
  }
  try {
  setPending(true);
  const res = await fetch("api/register",{
    method:"POST",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(info),
  });
  if(res.ok){
    setPending(false);
    const form = e.target;
    localStorage.setItem("users", JSON.stringify(info));
    form.reset();
    router.push("/login");
    console.log("User Registered");
  } else {
    const errorData = await res.json();
    toast.error(errorData.message)
    setPending(false);
  }
  } catch (error) {
 setPending(false);
 toast.error("Something Went Wrong!.")
  }
 }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
      
        <h2 className="text-[17px] mb-3 font-[500]">Register</h2>
        <input type="text" name="username" placeholder="Username" onChange={(e) => handleInput(e)}/>
        <input type="email" name="email" placeholder="Email" onChange={(e) => handleInput(e)}/>
        <input type="password" name="password" placeholder="Password" onChange={(e) => handleInput(e)}/>

          <button type='submit'>Register</button>


          <Link href="/login" className={styles.account}><span className={styles.account}> Have an account ? Login here </span></Link>

      </form>
    </div>
  )
}

export default Register;
