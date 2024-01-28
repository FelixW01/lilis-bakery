import styles from "./Header.module.css";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-light.png';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <>
   <nav className={styles.navbar}>
      <div className={styles.logoDiv}>
      {location.pathname === "/" ? 
      <a href="#main"><img src={logo} alt='logo' className={styles.logo}></img></a> 
      : <Link to={'/'}>
          <img src={logo} alt='logo' className={styles.logo}/>
          </Link>}
      </div>
      <div className={styles.navDiv}>
            <Link to='/login' className={styles.navLink}>Login</Link>
      </div>
      <div className={styles.navDiv}><Link to='/cart' className={styles.navLink}>Cart</Link></div>
    </nav>
    </>
  );
}