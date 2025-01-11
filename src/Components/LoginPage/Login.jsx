import React from "react";
import Cookies from "js-cookie";

import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import Logo from "../../assets/logo.jpeg";
import { authService } from "../../Service/Auth";

const LoginPage = ({setIsAuthenticated}) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    authService.loginUser(values)
      .then(response => {
        Cookies.set("jwtToken", response?.jwtToken)
        setIsAuthenticated(response?.jwtToken)
        navigate("/")
      })
      .catch(error => {
        console.log('error', error)
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container" style={{ padding: "10%" }}>
      <div className="logo">
        <img src={Logo} alt="DreamSix Logo" />
      </div>
      <h2>Welcome back! Glad to see you, Again!</h2>

      <Form
        name="loginpage"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="login-form"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please input your mobile number!" },
          ]}
        >
          <Input placeholder="User Name" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
