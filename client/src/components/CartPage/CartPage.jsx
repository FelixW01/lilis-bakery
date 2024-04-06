import styles from "./CartPage.module.css";
import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { Card, Select, Button} from 'antd';
import { UserContext } from "../../../context/userContext";
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';

export default function CartPage() {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true)
  const {user} = useContext(UserContext)
  const [itemId, setItemId] = useState()
  const [quantity, setQuantity] = useState(0)
  const [deleteItem, setDeleteItem] = useState(false)
  const token = localStorage.getItem('token');

  // Grabs cart information on mount
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
        setItemId(response.data.data.items[0].itemId);
        setLoading(false);
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
}, [user, token, loading, quantity, deleteItem]);


// Function to update cart quantity
const updateCartQuantity = async (itemId, newQuantity) => {

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

// deletes a cart item
const deleteCartItem = async (itemId) => {

  if (!token) {
    console.error('Token not found');
    return;
  }

  const headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  const data = {
    itemId: itemId,
    userId: user.id,
  }

  try {
    const response = await axios.delete('/cart', {
      data: data,
      withCredentials: true,
      headers: headers,
    });

    if (response.status === 200) {
      console.log('Item deleted successfully', response.data);
      toast.success('Item successfully deleted from cart')
      setDeleteItem(true);
    } else {
      console.log('Error deleting item', response.data.message);
      toast.error(data.error)
    }
  } catch (error) {
    console.error('Error deleting item', error.message);
  }
}

// Grabs the quantity selected, updates cart quantity.
  const handleChange = (value) => {
    setQuantity(value);
    updateCartQuantity(itemId, value);
  };

  const handlePayment = async () => {
  try {
    const cartItems = cart.data.items;
    const stripe = await loadStripe('pk_test_51OqP0IP7dWwtNpQwfOkZutQr1AiOoFSSezFT1lvs9Ojhdprt4QZRHY4yySq96e0L0uSfsVXSCGuRasJJcoNJL6ve00GrFnqlg2');

    const body = {
      products: cartItems,
      userId: cart.data.userId,
      subTotal: cart.data.subTotal,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    // Send a POST request to server endpoint for payment
    const response = await axios.post('/checkout', body, { headers });

    // Extract the session ID from the response
    const { sessionId } = response.data;

    // Use Stripe.js to redirect to checkout
    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    // Log the result after redirection
    console.log(result, '<<<<<<<<<<<<<<<<<<<result');

    if (result.error) {
      console.error('Error during payment', result.error.message);
    } else {
      console.log('Payment successful');
    }
  } catch (error) {
    console.error('Error handling payment', error.message);
  }
};

  return (
    <>
    <div className={styles.cartContainer}>
      <div className={styles.cardDiv}>
        {!loading && cart?.data?.items?.length > 0 ? 
        (
          <>
          <Card title={cart.data.items[0].name} bordered={false} style={{ width: 300 }}>
        <div className={styles.imgDiv}>
          <img src="images/nastar.png" alt="nastar" style={{width: 150, height: 150}}/>
        </div>
          <p>{`Price: $${cart.data.items[0].price}`}</p>
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
          <a className={styles.deleteAnchor} type="text" onClick={() => deleteCartItem(cart.data.items[0].itemId)}>Delete</a>
        </Card>

    <div className={styles.subTotalDiv}>
        <Card className={styles.subTotal} bordered={false} style={{ width: 300 }}>
          <p>{!loading ? `Subtotal (${cart.data.items[0].quantity} ${cart.data.items[0].quantity === 1 ? 'item' : 'items'}): $${cart.data.subTotal}` : "loading..."}</p>
      <div className={styles.checkoutDiv                                                                                                                                                                                                                                           }>
        <Button onClick={handlePayment} className={styles.checkoutButton} type='default'> Proceed to checkout </Button>
      </div>
        </Card>
    </div>
    </>
      ) : (<h2>{loading ? 'Loading...' : 'Your basket is empty.'}</h2>)}
      </div>
    </div>
    </>
  );
}