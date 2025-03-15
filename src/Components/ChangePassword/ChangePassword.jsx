import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import './ChangePassword.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { userService } from '../../Service/UserService';

const ChangePassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const payload = {
      password: values?.password,
      newPassword: values?.newPassword
    }

    userService.changePassword(payload)
      .then(response => {
        console.log('response', response)
      })
      .catch(error => {
        console.log('error', error)
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
     <Header/>
    <div className="change-password-container">
      <h2>Change Password</h2>
      <Form
        form={form}
      
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
      
          name="password"
          rules={[{ required: true, message: 'Please enter your current password' }]}
        >
          <Input.Password style={{border:"0.3px solid black"}} placeholder="Enter Current Password" />
        </Form.Item>

        <Form.Item
         
          name="newPassword"
          rules={[{ required: true, message: 'Please enter your new password' }]}
        >
          <Input.Password style={{border:"0.3px solid black"}}placeholder="Enter New Password" />
        </Form.Item>

        <Form.Item
      
          name="confirmNewPassword"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your new password' },
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
          <Input.Password style={{border:"0.3px solid black"}} placeholder="Enter Confirm New Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="save-button">
            save
          </Button>
        </Form.Item>
      </Form>
    </div>
    <Footer/>
    </div>
  );
};

export default ChangePassword;
