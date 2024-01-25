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

export default function Login() {
  const [form] = Form.useForm();

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
      >
        <Title>Login</Title>
        <Form.Item
          label="Email"
          className={styles.formItem}
          name="email"
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