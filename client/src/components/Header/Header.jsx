import styles from "./Header.module.css";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-light.png';
import { useLocation } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Dropdown } from 'antd';
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';

export default function Header() {
  const location = useLocation();
  const {user, logout} = useContext(UserContext);
  const items = [
  {
    key: '1',
    label: (
      <Link to='/orders' className={styles.logoutButton}>Orders</Link>
    )
  },{
     key: '2',
    label: (
      <Link to='/profile' className={styles.logoutButton}>Profile</Link>
    )
  },{
    key: '3',
    label: (
      <a href="#logout" type='text' className={styles.logoutButton} onClick={logout}>Logout</a>
    )
  },

]
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
      {user ? 
      <div className={styles.navDiv2}>
      <Dropdown menu={{ items }} trigger={['hover']} lacement='bottomRight'>
        <a onClick={(e) => e.preventDefault()} className={styles.navLink2}>{`Hi, ${capFirst(user.name)}`}<DownOutlined className={styles.downOutlined}/></a>
      </Dropdown>
      </div>
      : <div className={styles.navDiv}>
            <Link to='/login' className={styles.navLink}>Login</Link>
      </div>
      }
      <div className={styles.navDiv}><Link to='/cart' className={styles.navLink}><ShoppingCartOutlined className={styles.navIcon} />Cart</Link></div>
    </nav>
    </>
  );
}