"use client"
import { useState } from 'react';
import styles from '../forget.module.css';
import { updatePassword } from '@/app/utils/updatePassword';
import { useRouter } from 'next/navigation';

const NewPassword = ({params}) => {
    const [newPassword, setNewPassword] = useState("");
    const router = useRouter();

    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const handleSubmit = async (e) => {
      e.preventDefault();
      await updatePassword({ newPassword, token: params.token });
      console.log(newPassword, confirmNewPassword);
      router.replace("/login");

    };
  return (
    <div className={styles.container}>
      <div className={styles.container}>
      <form className={styles.form}  onSubmit={handleSubmit}>
      <h2 className="text-[17px] mb-3 font-[500]">New password</h2>

        <input
          type="password"
          name="newpassword"
          placeholder="new password"
          onChange={(e) => setNewPassword(e.target.value)}

        />
        <input
          type="password"
          name="confirmnewpassword"
          placeholder="confirm new password"
          onChange={(e) => setConfirmNewPassword(e.target.value)}

        />
        <button>Submit</button>

   
     
      </form>
    </div>
    </div>
  );
}

export default NewPassword;
