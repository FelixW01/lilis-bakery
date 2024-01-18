import styles from "./HomePage.module.css";
import videoBG from "../../assets/nastar.mp4";

export default function HomePage() {
  return (
    <>
      <div className={styles.main}>
      <video src={videoBG} autoPlay loop muted />
        <div className={styles.content}>
          <h3>Life's short, eat dessert first.</h3>
          <button>Order Now</button>
        </div>
      </div>
    </>
  );
}
