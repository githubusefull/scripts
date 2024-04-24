import Links from './links/Links'
import styles from "./navbar.module.css";
//import NavLink from './links/navLink/navLink';
import Link from 'next/link';

const Navbar = async () => {

  
  return (
    <div className={styles.container}>
      <Link href="/">
        <div className={styles.logo}>Scripts</div>
      </Link>
      
      <div>
      <Links/>
      </div>
    </div>
  )
}

export default Navbar
