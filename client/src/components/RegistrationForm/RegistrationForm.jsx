import {
  Typography,
  Card,
  Form,
  Input,
  Button
} from 'antd';
const { Title, Text, Paragraph } = Typography;
import { motion } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import styles from './RegistrationForm.module.css';

export default function Register() {
const [form] = Form.useForm();

  return (
    <div className={styles.backgroundContainer}>
    {/* <div></div> */}
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
        layout="vertical"
      >
        <Title>Register</Title>
        <Form.Item
          label="Your name"
          className={styles.formItem}
          name="name"
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