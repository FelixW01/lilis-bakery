import styles from "./OrdersPage.module.css";
import React, { useState, useEffect, useContext} from "react";
import { UserContext } from "../../../context/userContext";
import { Avatar, Card, Skeleton, Switch } from 'antd';
import axios from "axios";
const { Meta } = Card;


export default function OrdersPage() {
 const [loading, setLoading] = useState(true)
 const token = localStorage.getItem('token');
 const [orders, setOrders] = useState([]);
 const {user} = useContext(UserContext)

 if (!loading) {
  console.log(orders, '<<<<<<order')
 }

   // Function to format the date string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
        {loading ? 
        // Loading skeleton cards
        <>
          <Card style={{ width: 300, marginTop: 16 }}>
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
           </Card>
           <Card style={{ width: 300, marginTop: 16 }}>
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
           </Card>
           <Card style={{ width: 300, marginTop: 16 }}>
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
           </Card>
        </>
          : orders.length === 0
            ? <h1>No orders found.</h1>
            : orders.map(order => (
              <Card key={order.id} title={order.items[0].name} bordered={false} style={{ width: 300 }} className={styles.orderCard}>
                <p>Order Placed: {formatDate(order.createdAt)}</p>
                <p>Total: ${order.subTotal}</p>
                <div className={styles.imgDiv}>
                  <img src="images/nastar.png" alt="nastar" style={{ width: 125, height: 125 }} />
                </div>
              </Card>
            ))
        }
      </div>
    </div>
    </>
  );
}