import styles from "./HomePage.module.css";
import videoBG from "../../assets/nastar.mp4";
import nastar from "../../assets/nastar.png";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  // hard code itemId because we only have one item in the database
  const [itemId, setItemId] = useState()
  const [quantity, setQuantity] = useState(0)
  const [foodList, setFoodList] = useState([{}])

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get(`/food`);
        setFoodList(response.data)
        setItemId(response.data[0]._id)
      } catch (error) {
        console.error('Error fetching food data', error.message)
      }
    }
    fetchFoodData()
  },[])

  const addToCart = async () => {
    try {
      const response = await axios.post('/cart', {itemId, quantity});

      if (response.status === 200 || response.status === 201) {
        console.log('Item added to cart', response.data);
      } else {
        console.log('Error adding item to cart', response.data.message)
      }
    } catch (error) {
      console.error('Error adding item to cart', error.message);
    }
  }
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
        <p>{foodList[0].description}</p>
      </div>
      </div>

      <div className={styles.hero} id="hero">
      <h2>Order Today!</h2>
        <img src={nastar} className={styles.nastar}></img>
        <div className={styles.description}>
          <p>{`${foodList[0].name} | ${foodList[0].count} Pieces | ${foodList[0].weight}`}</p>
          <p>{foodList[0].ingridients}</p>
        </div>
        <div className={styles.price}>
            <p>{`$${foodList[0].price}`}</p>
            <select 
            id="quantity" 
            name="quantity" 
            className={styles.quantity} 
            defaultValue={"quantity"}
            onChange={(e) => setQuantity(e.target.value)}
            >
              <option value="quantity" disabled hidden>Quantity</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
      </div>

      <div className={styles.contact}>
      
      </div>
    </>
  );
}
