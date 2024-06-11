import styles from "./ProfilePage.module.css";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Avatar, Card, Skeleton, Typography, Modal, Form, Input } from 'antd';
const { Paragraph, Title } = Typography;
const { Meta } = Card;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
    const [form] = Form.useForm();
    const { user } = useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(null);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    userId: ''
  })

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
          setData({userId: response.data._id})
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

 const handleResetPassword = async (values) => {
    try {
        const response = await axios.post('/user/reset-password-from-profile', data, {
            withCredentials: true
        });
        const responseData = response.data;

        if (responseData.error) {
            console.log(responseData.error);
            toast.error('responseData.error');
            form.resetFields();
        } else {
            console.log(responseData.message);
            toast.success('Password reset successful');
            setOpen(false);
            form.resetFields();
            setData({});
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.error || 'An error occurred while resetting the password.';
            toast.error(errorMessage);
          } else {
            toast.error('An unknown error occurred.');
        }
    }
};

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

 const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    handleResetPassword()
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
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
            </Paragraph> : 
            <Paragraph className={styles.formText}>
              {' '}
              <Link onClick={showModal} >Reset Password</Link>
            </Paragraph>}
        <Modal
        title="Reset Password"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Card bordered={false} style={{ width: 300 }} className={styles.resetForm}>
          <Form
            form={form}
            id="reset-form"
            layout="vertical"
            onFinish={handleResetPassword}
          >
            <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input your current password!',
                    },
                ]}
            >
                <Input.Password
                    value={data.currentPassword}
                    placeholder="*******"
                    onChange={(e) => setData({ ...data, currentPassword: e.target.value })}
                />
            </Form.Item>
        <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password!',
                    },
                    {
                        min: 8,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*()-+=]*[^\s]?/,
                        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (value && getFieldValue('currentPassword') === value) {
                                return Promise.reject(new Error("New password can't be the same as the current password!"));
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input.Password
                    value={data.newPassword}
                    placeholder="*******"
                    onChange={(e) => setData({ ...data, newPassword: e.target.value })}
                />
            </Form.Item>

        <Form.Item
                label="Confirm New Password"
                name="confirmNewPassword"
                dependencies={['newPassword']}
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your new password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    value={data.confirmNewPassword}
                    placeholder="*******"
                    onChange={(e) => setData({ ...data, confirmNewPassword: e.target.value })}
                />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
          </Card>}
        </div>
        </motion.div>
      </div>
    </>
  );
}