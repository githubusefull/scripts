"use client";
import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
//import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {  signOut} from "next-auth/react";
const Links = ( ) => {
  const [open, setOpen] = useState(false)

  //const router = useRouter();
 const Logout = () => {
  signOut();
  localStorage.removeItem("users");
  alert("Are you sure you want to logout ?")
  toast.success("You have been logged out")
  }


  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
  
   
  ];

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.nav_links}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
          <NavLink item={{ title: "Register", path: "/register" }} />
          <button className={styles.Logout} onClick={() => Logout()}>
            Logout
          </button>
        </div>
      </div>

      <div className={styles.button} onClick={() => setOpen((prev) => !prev)}>
        Menu
      </div>
      <div className="">
   
        {open && (
          <ul
            className="flex justify-center items-center  absolute
 top-0 left-0 w-full h-screen bg-black text-gray-300"
          >
        
            <div>

            <div onClick={() => setOpen(!open)}
 className='curser-pointer pr-4 z-10 flex justify-start  absolute
 top-10 right-4 text-gray-500 md:hidden'>
{open ? <div className={styles.button} onClick={() => setOpen((prev) => !prev)}>
        Menu
      </div> : <div className={styles.button} onClick={() => setOpen((!open))}>
        Menu
      </div>}
</div>



              <div
                className="px-4 cursor-pointer capitalize  text-1xl mb-4 text-gray-500"
              >

                {links.map((link) => (
                  <>
                  <div className="m-3">
            <NavLink item={link} key={link.title} setOpen={setOpen}/>          
            </div>
            </>
          ))}
                            <div className="m-3">

            <NavLink item={{ title: "Register", path: "/register" }} />
          <button className={styles.LogoutMobil} onClick={() => Logout()}>
            Logout
          </button>
          </div>
              </div>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Links;
