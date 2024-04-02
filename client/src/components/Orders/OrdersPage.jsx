import styles from "./OrdersPage.module.css";
import React, { useState, useEffect, useContext} from "react";
import { UserContext } from "../../../context/userContext";
import { Card, Button} from 'antd';
import axios from "axios";


export default function OrdersPage() {
 const [loading, setLoading] = useState(true)
 const token = localStorage.getItem('token');
 const [orders, setOrders] = useState([]);
 const {user} = useContext(UserContext)

 if (!loading) {
  console.log(orders, '<<<<<<order')
 }

 // Grabs order information on mount
 useEffect(() => {
  const fetchOrderData = async () => {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    try {
      const response = await axios.get('/order', {
        withCredentials: true,
        headers: headers,
      });

      if (response.status === 200 || loading) {
        setOrders(response.data);
        setLoading(false);
      } else {
        console.error('Error fetching order data: Unexpected response structure', response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching order data', error.message);
      setLoading(false);
    }
  }
  if(user) {
    fetchOrderData();
  }
 }, [user, token, loading])

  return (
    <>
    <div className={styles.container}>
      <div className={styles.cardDiv}>
      {loading && orders.length === 0 
      ? <h1>No orders found.</h1> 
      : orders.map(order => (
          <Card key={order.id} title={order.items[0].name} bordered={false} style={{ width: 300 }} className={styles.orderCard}>
            <div className={styles.imgDiv}>
              <img src="images/nastar.png" alt="nastar" style={{width: 150, height: 150}}/>
            </div>
          </Card>
        ))
      }
      </div>
    </div>
    </>
  );
}