import styles from "./Header.module.css";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-light.png';
import { useLocation } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

export default function Header() {
  const location = useLocation();
  const {user} = useContext(UserContext);
  function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
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
      {/* if logged in, show logout, if logged out show login */}
      {user ? <div className={styles.navDiv}>
            <Link to='/login' className={styles.navLink}>{`Hi, ${capFirst(user.name)}`}</Link>
      </div>
      : <div className={styles.navDiv}>
            <Link to='/login' className={styles.navLink}>Login</Link>
      </div>
      }
      <div className={styles.navDiv}><Link to='/cart' className={styles.navLink}>Cart</Link></div>
    </nav>
    </>
  );
}