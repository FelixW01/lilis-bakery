import styles from "./HomePage.module.css";
import videoBG from "../../assets/nastar.mp4";
import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import { Select, Button } from 'antd';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  // hard code itemId because we only have one item in the database
  const [itemId, setItemId] = useState()
  const [quantity, setQuantity] = useState(0)
  const [foodList, setFoodList] = useState([{}])
  const {user} = useContext(UserContext)
  const navigate = useNavigate();

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

    if (quantity === 0 || !quantity) {
    console.log('Error adding item to cart: Quantity not selected');
    toast.error('Please select a quantity');
    return;
  }

    if (!user) {
      navigate('/login')
    }

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
      img: foodList[0].img,
    }
    try {
    const response = await axios.post('/cart', cartItem, {
      withCredentials: true,
      headers: headers,
    });

    if (response.status === 200 && quantity != 0 || response.status === 201 && quantity != 0) {
      console.log('Item added to cart', response.data);
      toast.success('Item added to cart');
    } else {
      console.log('Error adding item to cart', response.data.message);
      toast.error('Please select a quantity');;
    }
  } catch (error) {
    console.error('Error adding item to cart', error.message);
  }
};
  
  // Grabs the quantity selected
  const handleChange = (value) => {
    setQuantity(value);
  };

  // Checks if user is on mobile
  function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: .25,
      duration: 1.25,
    },
  },
};

  return (
    <>
    <div className={styles.main} id="main">
    <motion.div
        initial= {{opacity: 0}}
        whileInView= {{opacity: 1}}
        transition= {{delay: .1, duration: .8}}
        viewport={{ once: true }}
      >
       <div className={styles.videoWrapper}>
      {isMobile() 
      ? (<video src={videoBG} loading="lazy" type="video/mp4" loop muted playsInline autoPlay />) 
      : (<video src={videoBG} loading="lazy" type="video/mp4" loop muted autoPlay />)}
        <div className={styles.content}>
          <h3>Life's short, eat dessert first.</h3>
          <a href="#hero" className={styles.orderNow}><button>Order Now</button></a>
        </div>
       </div>
    </motion.div>
      
      
      <div className={styles.about}>
      <motion.div
        variants={fadeInAnimationVariants}
        initial= "initial"
        whileInView= "animate"
        viewport={{ once: true }}
      >
      <h2>What is Nastar?</h2>
      <img src={foodList[0].img} className={styles.nastar} alt={`${foodList[0].name}_img`}></img>
      <div className={styles.aboutDescription}>
        <p>{foodList[0].description}</p>
      </div>
      </motion.div>
      </div>
      

      <motion.div
        variants={fadeInAnimationVariants}
        initial= "initial"
        whileInView= "animate"
        viewport={{ once: true }}
      >
      <div className={styles.hero} id="hero">
      <h2>Order Today!</h2>
        <img src={foodList[0].img} className={styles.nastar} alt={`${foodList[0].name}_img`}></img>
        <div className={styles.description}>
          <p>{`${foodList[0].name} | ${foodList[0].count} Pieces | ${foodList[0].weight}`}</p>
          <p>{foodList[0].ingridients}</p>
        </div>
        <div className={styles.price}>
            
            <label htmlFor="quantity"><p>{`$${foodList[0].price}`}</p></label>
            <Select
            size="large"
            id="quantity"
            name="quantity"
            label="quantity"
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
            <Button onClick={addToCart} className={styles.addToCartBtn} type='default' size='large'> Add to cart </Button>
            
        </div>
      </div>
    </motion.div>
    </div>
    </>
  );
}
