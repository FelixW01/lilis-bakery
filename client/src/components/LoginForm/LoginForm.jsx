import { Link } from 'react-router-dom';
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Modal
} from 'antd';
const { Title, Paragraph } = Typography;
import styles from './LoginForm.module.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

export default function Login() {
  const [form] = Form.useForm();
    const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

   // Handles login of user
  const handleFormSubmit = async (values, e) => {

  try {
    const response = await axios.post('/user/login', data, {
      withCredentials: true
    });
    const responseData = response.data;

    if (responseData.error) {
      toast.error(responseData.error);
    } else {
      // Set Axios Authorization header
      const token = responseData.token;

      // Debugging
      console.log('Received token:', token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Debugging
      console.log('Authorization header set:', axios.defaults.headers.common['Authorization']);

      // Update user context
      setUser(responseData);

      // Store token in local storage
      localStorage.setItem('token', token);

      // Reset form fields
      form.resetFields();

      // Redirect user to home page
      navigate('/');

      // Display success message
      toast.success('Login Successful. Welcome!');
    }
  } catch (error) {
    console.log(error);
  }
  };

  const handleGuestLogin = async (values, e) => {
    try {
      const response = await axios.post('/user/login/guest', data, {
        withCredentials: true
      });
      const responseData = response.data;
  
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        // Set Axios Authorization header
        const token = responseData.token;
  
        // Debugging
        console.log('Received token:', token);
  
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
        // Debugging
        console.log('Authorization header set:', axios.defaults.headers.common['Authorization']);
  
        // Update user context
        setUser(responseData);
        console.log(responseData)
        // Store token in local storage
        localStorage.setItem('token', token);
  
        // Reset form fields
        form.resetFields();
  
        // Redirect user to home page
        navigate('/');
  
        // Display success message
        toast.success('Guest Login Successful. Welcome!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    handleGuestLogin()
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <div className={styles.backgroundContainer}>
    
    <motion.div
      key="login-form"
      initial={{y: '50%', opacity: 0, scale: 0.5}}
      animate={{y: 0, opacity: 1, scale: 1}}
      transition={{duration: 0.2, ease: 'easeOut'}}
    >
    <Card bordered={false} style={{ width: 300 }} className={styles.loginForm}>
      <Form
        form={form}
        id="login-form"
        layout="vertical"
        onFinish={handleFormSubmit}
      >
        <Title>Login</Title>
        <Form.Item
          label="Email"
          className={styles.formItem}
          name="email"
          value={data.email}
          onChange={(e) => setData({...data, email: e.target.value})}
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
          ]}
        >
          <Input
            placeholder="youremail@test.com"
            name="email"
            type="email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          className={styles.formItem}
          name="password"
          value={data.password}
          onChange={(e) => setData({...data, password: e.target.value})}
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        >
          <Input.Password
            placeholder="******"
            name="password"
            type="password"
          />
        </Form.Item>
        <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
        <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
          Login
        </Button>
        <Paragraph className={styles.formText}>
          Don't have an account?
          {' '}
          <Link to="/register">Register</Link>
        </Paragraph>
      </Form>
         <Button type="primary" onClick={showModal} className={styles.loginFormButton}>
          Guest Login
      </Button>
      <Modal
        title="Guest Login"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Card bordered={false} style={{ width: 300 }} className={styles.loginForm}>
          <Form
            form={form}
            id="login-form"
            layout="vertical"
            onFinish={handleGuestLogin}
          >
            <Form.Item
          label="Email"
          className={styles.formItem}
          name="email"
          value={data.email}
          onChange={(e) => setData({...data, email: e.target.value})}
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
          ]}
        >
          <Input
            placeholder="youremail@test.com"
            name="email"
            type="email"
          />
        </Form.Item>
        <Form.Item
          label="Name"
          className={styles.formItem}
          name="name"
          value={data.name}
          onChange={(e) => setData({...data, name: e.target.value})}
          rules={[
            {
              required: true,
              message: 'Please enter your name!',
            },
          ]}
        >
          <Input
            placeholder="Your Name"
            name="name"
            type="name"
          />
        </Form.Item>
          </Form>
        </Card>
      </Modal>
   
    </Card>
    </motion.div>
    </div>
    
  );
}