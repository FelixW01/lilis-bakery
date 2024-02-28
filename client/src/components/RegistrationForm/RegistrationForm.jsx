import {
  Typography,
  Card,
  Form,
  Input,
  Button
} from 'antd';
const { Title, Paragraph } = Typography;
import { motion } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import styles from './RegistrationForm.module.css';
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })
  
  // Handles registration of new user
  const handleFormSubmit = async (e) => {
    const {name, email, password} = data;
    try {
      const { data } = await axios.post('/user/register', {
        name, email, password
      });
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Registration Successful. Welcome!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.backgroundContainer}>
    <motion.div
      key="registration-form"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: .2, delay:  .2 }}
    > 
        
    <Card 
      bordered={false} 
      style={{ width: 300 }} 
      className={styles.registrationForm}
    >
      <Form
        form={form}
        id="registration-form"
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <Title>Register</Title>
        <Form.Item
          label="Your name"
          className={styles.formItem}
          name="name"
          type="text"
          value={data.name}
          onChange={(e) => setData({...data, name: e.target.value})}
          rules={[
            {
              required: true,
              message: 'Please input your first name',
            },
          ]}
        >
          <Input
            placeholder="First and last name"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          className={styles.formItem}
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => setData({...data, email: e.target.value})}
          rules={[
            {
              required: true,
              message: 'Please input your email address, this will be your username',
            },
          ]}
        >
          <Input
            placeholder="youremail@test.com"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          className={styles.formItem}
          name="password"
          type="password"
          value={data.password}
          onChange={(e) => setData({...data, password: e.target.value})}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            { min: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: "Must have a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number!" },
          ]}
        >
          <Input.Password
            placeholder="******"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className={styles.registrationFormButton}>
          Sign Up
        </Button>
        <Paragraph className={styles.formText}>
          Already have an account?
          {' '}
          <Link to="/login">Login</Link>
        </Paragraph>
      </Form>
    </Card>

     </motion.div>

    </div>
  );
}