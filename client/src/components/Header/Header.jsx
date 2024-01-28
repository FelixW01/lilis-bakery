import styles from "./Header.module.css";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-light.png';

export default function Header() {
  return (
    <>
   <nav className={styles.navbar}>
      <div className={styles.navDiv}>
          <Link to={'/'}>
            <img src={logo} alt='logo' className={styles.logo}/>
          </Link>
      </div>
      <div className={styles.navDiv}>
            <Link to='/login' className={styles.navLink}>Login</Link>
      </div>
      <div className={styles.navDiv}><Link to='/cart' className={styles.navLink}>Cart</Link></div>
    </nav>
    </>
  );
}