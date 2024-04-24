"use client"
import React, { useEffect } from 'react'
import styles from './registerForm.module.css';
import { register } from '@/utils/action';




const RegisterForm = () => {

  return (
    <div>
    <div className={styles.container}>
     <div className={styles.wrapper}>
     <h2>Register</h2>
    <form action={register} className={styles.form} >
     <input type="text" placeholder="username" name="username" />
     <input type="email" placeholder="email" name="email" />
     <input type="password" placeholder="password" name="password" />
     <input type="password" placeholder="confirm password" name="confirmpassword" />
     <button type='submit'>Register</button>

    </form>
    </div>
    </div>
   </div>
  )
}

export default RegisterForm;
