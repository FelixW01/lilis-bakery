import styles from "./CartPage.module.css";

export default function CartPage() {
  return (
    <>
    <div className={styles.cartContainer}>
      <div className={styles.cardDiv}>
        <h2>Your Basket is empty.</h2>
      </div>
    </div>
    </>
  );
}