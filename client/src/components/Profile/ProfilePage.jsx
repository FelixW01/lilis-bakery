import styles from "./ProfilePage.module.css";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Avatar, Card, Skeleton, Button, Typography, } from 'antd';
const { Paragraph, Title } = Typography;
const { Meta } = Card;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const { user } = useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(null);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true)

    function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  useEffect(() => {
    const getUserData = async () => {
      try {
        if(user) {
          const response = await axios.get('/user/getUser', {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            email: user.email,
          }
        });

        if (response.status === 200) {
          setCurrentUser(response.data);
          setLoading(false)
        } else {
          console.error('Error fetching user data:', response.data);
          setLoading(false)
        }
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setLoading(false)
      }
    };
    if (token) {
      getUserData();
    }
  }, [user, token]);

 const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: .1,
      duration: .8,
    },
  },
 };

  return (
    <>
      <div className={styles.container}>
      <motion.div
        variants={fadeInAnimationVariants}
        initial= "initial"
        whileInView= "animate"
        viewport={{ once: true }}
      >
        <div className={styles.cardDiv}>
          {loading && !currentUser ? (
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
          ) : 
          <Card bordered={false} className={styles.orderCard}>
            <Title>Your Profile</Title>
            <h4>Name: {capFirst(user.name)}</h4>
            <h4>Email: {user.email}</h4>
            {currentUser.isGuest ? <Paragraph className={styles.formText}>
              {' '}
              <Link to="/register">Upgrade Account</Link>
            </Paragraph> : <Paragraph className={styles.formText}>
              {' '}
              <Link to="/reset-password">Reset Password</Link>
            </Paragraph>}
          </Card>}
        </div>
        </motion.div>
      </div>
    </>
  );
}