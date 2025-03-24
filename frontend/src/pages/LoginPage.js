import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate(); // For navigation

  const onFinish = (values) => {
    console.log("Login Info:", values);
    navigate("/dashboard"); // Redirect to Dashboard
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
          Login
        </Title>
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please enter your username!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Enter username" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
            <a style={{ float: "right" }} href="#">Forgot password?</a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Log In</Button>
          </Form.Item>
          <div style={{ textAlign: "center" }}>Don't have an account? <a href="#">Sign up</a></div>
        </Form>
      </Card>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  card: {
    width: 380,
    padding: 24,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    borderRadius: 8,
  },
};

export default LoginPage;
