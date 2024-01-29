import styles from "./HomePage.module.css";
import videoBG from "../../assets/nastar.mp4";
import nastar from "../../assets/nastar.png";


export default function HomePage() {

  return (
    <>

      <div className={styles.main} id="main">
      <video src={videoBG} autoPlay loop muted />
        <div className={styles.content}>
          <h3>Life's short, eat dessert first.</h3>
          <button><a href="#hero" className={styles.orderNow}>Order Now</a></button>
        </div>
      </div>

      <div className={styles.about}>
      <h2>What is Nastar?</h2>
      <img src={nastar} className={styles.nastar}></img>
      <div className={styles.description}>
        <p>Nastar is a traditional Indonesian pastry renowned for it's delightful combination of crunchy buttery pastry and sweet-tangy pineapple filling.</p>
      </div>
      </div>

      <div className={styles.hero} id="hero">
      <h2>Order Today!</h2>
        <img src={nastar} className={styles.nastar}></img>
        <div className={styles.description}>
          <p>Nastar | 25 Pieces | 13.4 oz</p>
          <p>All-Purpose flour, unsalted butter, egg yolks, powdered sugar, vanilla extract, pineapple jam.</p>
        </div>
        <div className={styles.price}>
            <p>$25</p>
            <select id="quantity" name="quantity" className={styles.quantity} defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled hidden>Quantity</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button>Add to Cart</button>
        </div>
      </div>

      <div className={styles.contact}>
      
      </div>
    </>
  );
}
