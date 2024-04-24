"use client"
import Link from 'next/link';
import styles from './forget.module.css';
import { useState } from 'react';
import { mailAction } from '@/app/utils/mailAction';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Forget = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
 const handleSubmit = async (e) => {
  e.preventDefault();
  await mailAction({email});
  toast.success("Email sent.")
  router.replace("/login");

 }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className="text-[17px] mb-3 font-[500]">Reset your password</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
       
        <button>Reset password</button>
        
         <button><Link href="/login">Go back</Link></button>
        
       

      
      </form>
    </div>
  );
}

export default Forget;
