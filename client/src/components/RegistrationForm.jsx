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


export default function Register() {
const [form] = Form.useForm();

  return (
    <div>
    <div></div>
    <motion.div
      key="registration-form"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: .2, delay:  .2 }}
    > 
        
    <Card 
      bordered={false} 
      style={{ width: 300 }} 
    >
      <Form
        form={form}
        id="registration-form"
        layout="vertical"
      >
        <Title >Register</Title>
        <Form.Item
          label="First name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name',
            },
          ]}
        >
          <Input
            placeholder="First name"
          />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name',
            },
          ]}
        >
          <Input
            placeholder="Last name"
          />
        </Form.Item>
        <Form.Item
          label="Family name"
          name="family"
          rules={[
            {
              required: true,
              message: 'Please input your family name',
            },
          ]}
        >
          <Input
            placeholder="Family name"
          />
        </Form.Item>
        <Form.Item
          label="Email"
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
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            { min: 5, message: "Password must be at least 5 characters" },
          ]}
        >
          <Input.Password
            placeholder="******"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
        <Paragraph>
          Already have an account? Login
          {' '}
          <Link to="/login">here</Link>
        </Paragraph>
      </Form>
    </Card>

     </motion.div>

    </div>
  );
}