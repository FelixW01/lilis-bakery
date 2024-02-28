import { Link } from 'react-router-dom';
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Checkbox
} from 'antd';
const { Title, Text, Paragraph } = Typography;
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

   // Handles login of user
  const handleFormSubmit = async (e) => {
    const {email, password} = data;
    try {
      const { data } = await axios.post('/user/login', {
       email, password
      });
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        setUser(data)
        localStorage.setItem('token', data.token)
        toast.success('Login Successful. Welcome!')
        navigate('/')
        form.resetFields()
      }
    } catch (error) {
      console.log(error)
    }
  }

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
    </Card>
    </motion.div>
    </div>
    
  );
}