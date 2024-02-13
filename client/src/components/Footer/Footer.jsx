import styles from "./Footer.module.css";
import { UpOutlined } from '@ant-design/icons';

const socials = [
    {
      instagram: {
      icon: "fa-brands fa-instagram",
      href: "https://www.instagram.com/lilisbakery_/",
      name: "Instagram",
    }
  },
  {
    facebook: {
      icon: "fa-brands fa-square-facebook",
      href: "https://www.instagram.com/lilisbakery_/",
      name: "Facebook",
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
    <a className={styles.upArrow} onClick={goToTop}><UpOutlined /></a>
    <div className={styles.socialsDiv}>
      <ul className={styles.socialsUl}>
      {/* Loop through socials array */}
        {socials.map((social, index) => {
          const socialKey = Object.keys(social)[0]
          const { icon, href, name} = social[socialKey]
          return (
        <li key={index}>
            <a
             href={href}
             target="_blank"
             rel="noopener noreferrer" // Added for Security
             className={styles.socialsLink}
             >
              <i className={icon} alt={`${name}_icon`}></i>
            </a>
        </li>
          )
        })}
        <li>
          <a href="mailto:felixwillem01@yahoo.com" className={styles.socialsLink}
            ><i className="fa-solid fa-envelope"></i>
          </a>
        </li>
      </ul>
    </div>
      <p className={styles.copyright}>&copy; {getCurrentYear()} Lili's Bakery</p>
    </div>
    </>
  );
}