import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import styles from './ResetPasswordPage.module.css';

export default function resetPasswordPage()  {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const handleResetPassword = async (values) => {
    if (!token) {
      toast.error('Invalid token');
      return;
    }

    try {
      await axios.post('/user/reset-password', { token, ...values });
      toast.success('Password reset successful');
      form.resetFields();
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Error resetting password');
    }
  };

  return (
    <div className={styles.container}>
      <Card bordered={false} className={styles.resetPasswordForm}>
      <h4>Reset Password</h4>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleResetPassword}
        >
          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your new password!' }]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className={styles.resetPasswordButton}>
            Reset Password
          </Button>
        </Form>
      </Card>
    </div>
  );
};