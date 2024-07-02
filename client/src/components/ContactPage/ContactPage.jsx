import styles from "./ContactPage.module.css";
import {
  Typography,
  Card,
  Form,
  Input,
  Button
} from 'antd';
const { Title } = Typography;
import { motion } from 'framer-motion'; 
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';

export default function ContactPage() {
  const [form] = Form.useForm();
  const initialState = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }
  const [data, setData] = useState(initialState)
  
  const handleFormSubmit = async () => {
    try {
      const response = await axios.post('/user/send-email', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(response.status === 200) {
      toast.success(' Your message has been sent successfully!')
      form.resetFields();
      setData(initialState);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
    <motion.div
      key="contact-form"
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: .8, delay:  .1 }}
    >
    
    <Card 
      bordered={false} 
      style={{ width: 300 }} 
      className={styles.contactForm}
    >
      <Form
        form={form}
        id="contact-form"
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <Title>Get In Touch</Title>
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
            placeholder="Your name"
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
          label="Subject"
          className={styles.formItem}
          name="subject"
          type="subject"
          value={data.subject}
          onChange={(e) => setData({...data, subject: e.target.value})}
        >
          <Input
            placeholder="What is your message about?"
          />
        </Form.Item>

        <Form.Item
          label="Message"
          className={styles.formItem}
          name="message"
          type="message"
          value={data.message}
          onChange={(e) => setData({...data, message: e.target.value})}
          rules={[
            {
              required: true,
              message: 'Please enter a message',
            },
          ]}
        >
          <Input.TextArea
            placeholder="What's on your mind?"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" className={styles.contactFormButton}>
          Send Message
        </Button>
      </Form>
    </Card>
     </motion.div>

    </div>
  );
}