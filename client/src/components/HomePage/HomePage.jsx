import styles from "./HomePage.module.css";
import videoBG from "../../assets/nastar.mp4";
import nastar from "../../assets/nastar.png";
import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import { Select } from 'antd';

export default function HomePage() {
  // hard code itemId because we only have one item in the database
  const [itemId, setItemId] = useState()
  const [quantity, setQuantity] = useState(0)
  const [foodList, setFoodList] = useState([{}])
  const {user} = useContext(UserContext)
  // Grabs food information on mount
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

  // Adds item to cart
  const addToCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const cartItem = {
      itemId: itemId,
      quantity: quantity,
      userId: user.id,
    }
    try {
      const response = await axios.post('/cart', cartItem, {
        withCredentials: true,
        headers: headers,
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Item added to cart', response.data);
      } else {
        console.log('Error adding item to cart', response.data.message)
      }
    } catch (error) {
      console.error('Error adding item to cart', error.message);
    }
  }
  
  // Grabs the quantity selected
  const handleChange = (value) => {
    setQuantity(value);
  };

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
            <Select
            id="quantity"
            name="quantity"
            className={styles.quantity} 
            defaultValue="Quantity"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
             { value: 'Quantity', label: 'Quantity', disabled: true, hidden: true},
             { value: '1', label: '1' },
             { value: '2', label: '2' },
             { value: '3', label: '3' },
             { value: '4', label: '4' },
             { value: '5', label: '5' },
      ]}
    />
            <button onClick={addToCart}>Add to Cart</button>
        </div>
      </div>

      <div className={styles.contact}>
      
      </div>
    </>
  );
}
