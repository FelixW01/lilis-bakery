import styles from "./CartPage.module.css";
import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import { Card, Select } from 'antd';

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
          <a></a>
          <Select
            defaultValue={cart.data.items[0].quantity}
            style={{ width: 120 }}
           // onChange={handleChange}
            options={[
             { value: '1', label: '1' },
            { value: '2', label: '2' },
             { value: '3', label: '3' },
             { value: '4', label: '4' },
             { value: '5', label: '5' },
      ]}
    />
          <div>
            <button>Delete</button>
          </div>
        </Card> ) : (<h2>{loading ? 'Loading...' : 'Your basket is empty.'}</h2>)}
      </div>
    </div>
    </>
  );
}