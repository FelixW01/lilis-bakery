import styles from "./SuccessPage.module.css";
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../../../context/userContext";

export default function SuccessPage() {

const token = localStorage.getItem('token');
const [loading, setLoading] = useState(true)
const [cart, setCart] = useState([]);
const {user, isCheckedOut, setIsCheckedOut} = useContext(UserContext)

  const handleDeleteCart = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    try {
    const response = await axios.delete('/checkout', {
      withCredentials: true,
      headers: headers,
    });
    if (response.status === 200) {
      console.log('Cart deleted successfully', response.data);
    } else {
      console.error('Error deleting cart', response.data.message);
    }
    } catch {
      console.error('Error deleting cart', error.message);
    }
  };

  const handleCreateOrder = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const body = {
      items: cart.data.items,
      subTotal: cart.data.subTotal,
    };
    try {
      const response = await axios.post('/order', body, {
        withCredentials: true,
        headers: headers,
      });
      if (response.status === 201) {
        console.log('Order created successfully', response.data);
      } else {
        console.error('Error creating order', response.data.message);
      }
    } catch (error) {
      console.error('Error creating order', error.message);
  }
};

  useEffect(() => {
    const fetchCartData = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
     };
      const data = {
        userId: user.id,
      };

    try {
      if (!user && !loading || !user.id && !loading) {
        console.error('User information not available');
        return;
      }
      const response = await axios.get(`/cart?userId=${user.id}`, {
        withCredentials: true,
        headers: headers,
      });

      if (response.status === 200 || loading) {
        setCart(response.data);
        setLoading(false);

        if(cart && cart.data) {
          handleCreateOrder(); // Call handleCreateOrder only if payment is successful
          handleDeleteCart(); // Call handleDeleteOrder only if payment is successful
          console.log(isCheckedOut, '<<<<<<<BEFORE')
          // setIsCheckedOut(false);
          // console.log(isCheckedOut, '<<<<<<<AFTER')
        }
      } else {
        console.error('Error fetching cart data: Unexpected response structure', response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching cart data', error.message);
      setLoading(false);
    }
  };
  if(user) {
    fetchCartData();
  }
}, [user, token, loading]);
  

  return (
    <div className={styles.container}>
      <div>
        <h2>Payment Successful!</h2>
      </div>
    </div>
  );
}