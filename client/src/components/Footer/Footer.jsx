import styles from "./Footer.module.css";
import { UpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';

const socials = [
    {
      instagram: {
      icon: "fa-brands fa-instagram",
      href: "https://www.instagram.com/lilisculinary/",
      name: "Instagram",
    }
  },
  {
    youtube: {
      icon: "fa-brands fa-youtube",
      href: "https://www.youtube.com/@BeepTheProgrammer/videos",
      name: "Youtube",
    }
  }
]

export default function Footer() {

  function getCurrentYear() {
    return new Date().getFullYear();
  }
  function goToTop() {
  document.documentElement.scrollTop = 0;
}
  return (
    <>
    <div className={styles.container}>
    <a href="#" className={styles.upArrow} onClick={goToTop}><UpOutlined /></a>
    <div className={styles.socialsDiv}>
      <ul className={styles.socialsUl}>
      {/* Loop through socials array */}
        {socials.map((social, index) => {
          const socialKey = Object.keys(social)[0]
          const { icon, href, name } = social[socialKey]
          return (
      <Tooltip title={name}>
        <li key={index}>
            <a
             href={href}
             target="_blank"
             rel="noopener noreferrer"
             className={styles.socialsLink}
             aria-label={name}
             >
              <i className={icon} alt={`${name}_icon`}></i>
            </a>
        </li>
      </Tooltip>
          )
        })}
        <li>
          <Tooltip title="Contact">
            <Link to='/contact' className={styles.socialsLink}> <i className="fa-solid fa-envelope"></i></Link>
          </Tooltip> 
        </li>
      </ul>
    </div>
      <p className={styles.copyright}>&copy; {getCurrentYear()} Lili's Bakery</p>
    </div>
    </>
  );
}