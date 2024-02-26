import styles from "./CartPage.module.css";
import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { Card, Select, Button} from 'antd';
import { UserContext } from "../../../context/userContext";

export default function CartPage() {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true)
  const {user} = useContext(UserContext)
  const [itemId, setItemId] = useState()
  const [quantity, setQuantity] = useState(0)

  // Grabs cart information on mount
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`/cart`);
        setCart(response.data)
        setItemId(response.data.data.items[0].itemId)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching cart data', error.message)
        setLoading(false)
      }
    }
    fetchCartData()
  },[])

// Function to update cart quantity
const updateCartQuantity = async (itemId, newQuantity) => {
  const token = localStorage.getItem('token'); // Assuming you have a token stored in localStorage

  if (!token) {
    console.error('Token not found');
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const data = {
    itemId: itemId,
    newQuantity: newQuantity,
    userId: user.id,
  };

  try {
    const response = await axios.put('/cart', data, {
      withCredentials: true,
      headers: headers,
    });

    if (response.status === 200) {
      console.log('Cart quantity updated successfully', response.data);
    } else {
      console.log('Error updating cart quantity', response.data.message);
    }
  } catch (error) {
    console.error('Error updating cart quantity', error.message);
  }
};

// Grabs the quantity selected, updates cart quantity.
  const handleChange = (value) => {
    setQuantity(value);
    updateCartQuantity(itemId, value);
  };

  return (
    <>
    <div className={styles.cartContainer}>
      <div className={styles.cardDiv}>
        {!loading && cart?.data?.items?.length > 0 ? 
        (<Card title={cart.data.items[0].name} bordered={false} style={{ width: 300 }}>
          <p>{`Price: $${cart.data.items[0].price}`}</p>
          <a></a>
          <Select
            defaultValue={cart.data.items[0].quantity}
            style={{ width: 70 }}
            onChange={handleChange}
            options={[
             { value: '1', label: '1' },
             { value: '2', label: '2' },
             { value: '3', label: '3' },
             { value: '4', label: '4' },
             { value: '5', label: '5' },
      ]}
    />
            <Button type="text">Delete</Button>
        </Card> ) : (<h2>{loading ? 'Loading...' : 'Your basket is empty.'}</h2>)}
      </div>
    </div>
    </>
  );
}