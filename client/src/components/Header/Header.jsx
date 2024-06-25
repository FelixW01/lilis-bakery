import styles from "./Header.module.css";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-light.png';
import logoDark from '../../assets/logo-light-bg.png';
import DarkIcon from '../Icons/DarkIcon';
import LightIcon from '../Icons/LightIcon';
import { useLocation } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Dropdown, Tooltip, Button} from 'antd';
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useTheme } from '../../../context/themeContext';

export default function Header() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useTheme();
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
];

  function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
   <nav className={styles.navbar}>
      <div className={styles.logoDiv}>
      {location.pathname === "/" ? 
      <a href="#main"><img src={darkMode ? logoDark : logo} alt='logo' className={styles.logo} loading="lazy"></img></a> 
      : <Link to={'/'}>
          <img src={darkMode ? logoDark : logo} alt='logo' className={styles.logo}/>
          </Link>}
      </div>
      <div className={styles.navDiv2}>
      <div className={styles.navDiv}>
            <Button
              type='text'
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className={styles.themeBtn}
            >
              {darkMode ? <LightIcon /> : <DarkIcon />}
            </Button>
        </div>
      <div className={styles.navDiv}>
      {user ? 
      <Dropdown menu={{ items }} trigger={['hover']} lacement='bottomRight'>
        <a href="#" onClick={(e) => e.preventDefault()} className={styles.navLink2}>{`Hi, ${capFirst(user.name)}`}<DownOutlined className={styles.downOutlined}/></a>
      </Dropdown>
      : 
            <Link to='/login' className={styles.navLink}>Login</Link>
      }
      </div>
      <div className={styles.navDiv}><Link to='/cart' className={styles.navLink}><ShoppingCartOutlined className={styles.navIcon} />Cart</Link></div>
      </div>
    </nav>
    </>
  );
}