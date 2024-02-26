import styles from "./CartPage.module.css";
import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import { Card } from 'antd';

export default function CartPage() {

  const [cart, setCart] = useState([]);
  const {user} = useContext(UserContext)

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`/cart`);
        setCart(response.data)
      } catch (error) {
        console.error('Error fetching cart data', error.message)
      }
    }
    fetchCartData()
  },[])

  console.log(cart)

  return (
    <>
    <div className={styles.cartContainer}>
      <div className={styles.cardDiv}>
        <Card title="Card title" bordered={false} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </div>
    </>
  );
}