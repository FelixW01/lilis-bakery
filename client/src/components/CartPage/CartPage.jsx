import styles from "./CartPage.module.css";
import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import { Card } from 'antd';

export default function CartPage() {

  const [cart, setCart] = useState([]);
  const {user} = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`/cart`);
        setCart(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching cart data', error.message)
        setLoading(false)
      }
    }
    fetchCartData()
  },[])

  {cart ? console.log(cart.data) : console.log('no cart')}

  return (
    <>
    <div className={styles.cartContainer}>
      <div className={styles.cardDiv}>
        {!loading && cart?.data?.items?.length > 0 ? (<Card title={cart.data.items[0].name} bordered={false} style={{ width: 300 }}>
          <p>{`Price: $${cart.data.items[0].price}`}</p>
          <a>{`Qty: ${cart.data.items[0].quantity}`}</a>
          <div>
            <button>Delete</button>
          </div>
        </Card> ) : (<h2>{loading ? 'Loading...' : 'Your basket is empty.'}</h2>)}
      </div>
    </div>
    </>
  );
}