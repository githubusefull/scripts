"use client";

import React, { useState } from 'react'
import styles from  "./navLink.module.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const NavLink = ({item, setOpen}) => {
  const pathName = usePathname();
  const top = () => {
    window.scrollTo(0, 0);
  }
  function myFunction(){
    top();
    setOpen(false);
}
  return (
    <Link  href={item.path} key={item.title} className={`${styles.container} 
     ${pathName === item.path && styles.active}`} onClick={() => myFunction()}>
{item.title}
    </Link>
  )
}

export default NavLink
